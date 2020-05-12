/* Author: Ian

*/

Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
};

function logger(s)
{
	console.log(s);
}

//thinking skill, array of content modifiers, CONTENT, array of resources, array of products, group size...
function ofThe(s)
{
	return s + " of the ";
}
function the(s)
{
	return s + " the ";
}
function aAn(s)
{
	if(s == "wikipedia")
	{
		return "Wikipedia";
	}
	var first = s.charAt(0);
	var vowels = new Array("a","e","i","o","u");
	for (var i = vowels.length - 1; i >= 0; i--){
		if(first.toLowerCase() == vowels[i])
		{
			return "an " + s;
		}
	};
	return "a " + s;
}

Handlebars.registerHelper('ittr', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

if(context && context.length > 0) 
{
    for(var i=0, j=context.length; i<j; i++) 
	{
		this.first = false;
		this.last = false;
		if( i == 0 )
		{
			this.first = true;
		}
		if (i == j-1)
		{
			this.last = true;
		}
		
      ret = ret + fn(_.extend({}, {word:context[i]}, { i: i}, {first:this.first}, {last:this.last}));
    }
} 
else 
{
    ret = inverse(this);

}
  return ret;
});

Handlebars.registerHelper('commaList', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
		this.first = false;
		this.last = false;
		if( i == 0 )
		{
			this.first = true;
		}
		if(i == j-1)
		{
			this.last = true;
		}
	
		if( i == j - 1)
		{
			ret = ret + fn(_.extend({}, {word:context[i]}, { i: i},{first:this.first},{last:this.last}));			
		}
		else
		{
			if( context.length == 2)
			{
				ret = ret + fn(_.extend({}, {word:context[i]}, { i: i},{first:this.first},{last:this.last})) + " or ";
			}			
			else
			{	
				ret = ret + fn(_.extend({}, {word:context[i]}, { i: i}, {first:this.first},{last:this.last})) + ", or ";
			}
		}
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

var Objective = Backbone.Model.extend({
	defaults : {
		"thinking_skill" : "judge the",
		"content" : "[click to edit]",
		"p_glue" : "and create",
		"r_glue" : " using ",
		"resources" : "a textbook",
		"g_glue" : "in groups of",
		"group_size" : "three"
	},
	initialize : function(){
		if( !this.get('content_modifiers') )
		{
			this.set({'content_modifiers': new Array("ethics of the") });
		}
		
		if( !this.get('products') )
		{
			this.set({'products': new Array(aAn("essay")) });
		}
	},
	getCM : function()
	{
		if( !this.get('content_modifiers') )
		{
			return new Array();
		}
		else
		{
			return this.get('content_modifiers');
		}
	},
	getP : function()
	{
		if( !this.get('products') )
		{
			return new Array();
		}
		else
		{
			return this.get('products');
		}
	}
	
});

var ObjectiveView = Backbone.View.extend({
	tagName : "div",
	id : "obj",
	el: "#obj",
	events : {
		"click #p-obj" : "editObj",
		"click #closeEdit" : "closeEdit",
		"keypress :input" : "pressEnter",
		"click .p_delete" : "deleteP",
		"click .p_right" : "movePRight",	
		"click .p_left" : "movePLeft",		
		"click .cm_delete" : "deleteCM",
		"click .cm_right" : "moveCMRight",	
		"click .cm_left" : "moveCMLeft"		
	},
	pressEnter: function(e)
	{
		var code = e.keyCode || e.which;
		if( code == 13 )
		{
			this.closeEdit(e);
		}
	},
	movePRight: function(e)
	{
		e.preventDefault();		
		var id = $(e.currentTarget).data("n");
		var a = this.model.getP();
		a = a.move(id,id+1);
		this.model.set({"products" : a });	
		this.editObj();	
	},
	movePLeft : function(e)
	{
		e.preventDefault();				
		var id = $(e.currentTarget).data("n");
		var a = this.model.getP();
		a = a.move(id,id-1);
		this.model.set({"products" : a });	
		this.editObj();	
	},	
	deleteP : function(e)
	{
		e.preventDefault();				
		var id = $(e.currentTarget).data("n");
		var a = this.model.get("products");
		a.splice(id,1);
		this.model.set({"products" : a});
		var that = this;
		$("#p-pair-" + id).hide("fade", {},400, function(){$(this).remove(); that.editObj();});		
	},
	moveCMRight: function(e)
	{
		e.preventDefault();		
		var id = $(e.currentTarget).data("n");
		var a = this.model.getCM();
		a = a.move(id,id+1);
		this.model.set({"content_modifiers" : a });	
		this.editObj();	
	},
	moveCMLeft : function(e)
	{
		e.preventDefault();		
		var id = $(e.currentTarget).data("n");
		var a = this.model.getCM();
		a = a.move(id,id-1);
		this.model.set({"content_modifiers" : a });	
		this.editObj();	
	},	
	deleteCM : function(e)
	{
		e.preventDefault();				
		var id = $(e.currentTarget).data("n");
		var a = this.model.get("content_modifiers");
		//what if the id has changed!
		a.splice(id,1);
		this.model.set({"content_modifiers" : a});
		var that = this;
		$("#cm-pair-" + id).hide("fade", {}, 400, function(){$(this).remove();that.editObj();});
	},
	closeEdit : function()
	{
		var c_a = this.model.get("content_modifiers");
		for (var i = 0; i < c_a.length; i++)
		{
			if($("#cm" + i).val() != undefined)
			{
				c_a[i] = $("#cm" + i).val();
			}
		};
		
		
		var p_a = this.model.get("products");
		for (var i = 0; i < p_a.length; i++)
		{
			p_a[i] = $("#p" + i).val();
		};

		this.model.set({
			'thinking_skill':$("#ts_edit").val(),
			'content':$("#c_edit").val(),
			'resources':$("#r_edit").val(),			
			'thinking_skill':$("#ts_edit").val(),
			'group_size':$("#group_size_edit").val(),
			'p_glue':$("#p_glue_edit").val(),
			'products' : p_a,
			'content_modifiers' : c_a
			});
		
				
		return this.render();
	},
	editP : function()
	{
		var source = $("#edit-p-template").html();
		var template = Handlebars.compile(source);	
		var html = template(this.model.toJSON());
		$(this.el).children("#text").html(html);
		$("#p_tab").click();		
		return this;				
	},		
	editCM : function()
	{
		var source = $("#edit-cm-template").html();
		var template = Handlebars.compile(source);	
		var html = template(this.model.toJSON());
		$(this.el).children("#text").html(html);
		$("#cm_tab").click();
		return this;				
	},	
	editObj : function()
	{
		var source = $("#edit-obj-template").html();
		var template = Handlebars.compile(source);	
		var html = template(this.model.toJSON());
		$(this.el).children("#text").html(html);
		$('input').each(function(){
			var size = $(this).val().length;
			if(size > 15)
			{
				size = 15;
			}		
			size = size*13; // average width of a char
			$(this).css('width',size);
		});		
		return this;				
	},
	setModel : function(m)
	{
		this.model = m;
		_.bindAll(this, "renderTS");		
		_.bindAll(this, "renderCM");
		_.bindAll(this, "renderP");
		_.bindAll(this, "renderG");
		_.bindAll(this, "renderR");				
		this.model.bind('change:thinking_skill', this.renderTS);				
		this.model.bind('change:resources', this.renderR);				
		this.model.bind('change:group_size', this.renderG);								
		this.model.bind('change_cm', this.renderCM);		
		this.model.bind('change_p', this.renderP);				
	},
	renderTS : function()
	{
		this.render();	
		$("#ts_span").effect("highlight",{}, 1000);		
	},
	renderCM : function()
	{
		this.render();	
		$("#cm_span").effect("highlight",{}, 1000);		
	},	
	renderP : function()
	{
		this.render();	
		$("#p_span").effect("highlight",{}, 1000);		
	},	
	renderG : function()
	{
		this.render();	
		$("#g_span").effect("highlight",{}, 1000);		
	},
	renderR : function()
	{
		this.render();	
		$("#r_span").effect("highlight",{}, 1000);		
	},		
	render : function()
	{
		var source = $("#obj-template").html();
		var template = Handlebars.compile(source);	
		var html = template(this.model.toJSON());
		$(this.el).children("#text").html(html);		
		return this;		
	}
});



