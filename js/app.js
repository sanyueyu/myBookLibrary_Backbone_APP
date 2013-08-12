(function($) {
	var books = [
				 {title:"JS the good parts", author:"John Doe", releaseDate:"2012", keyWords:"JavaScript"},
				 {title:"CS the better parts", author:"John Doe", releaseDate:"2012", keyWords:"CoffeeScript"},
				 {title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keyWords:"Scala"},
				 {title:"American Psyco", author:"Bret Easton Ellis", releaseDate:"2012", keyWords:"Novel"},
				 {title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2002", keyWords:"JavaScript"}];
	var Book = Backbone.Model.extend({
		defaults: {
			coverImage: "img/placeholder.png",
			title: "Some title",
			author: "jone done",
			releaseDate: "2012",
			keyWords: "javascript programming2"
		},								 
	});		  
	
	var Library = Backbone.Collection.extend({model: Book});
	
	var BookView = Backbone.View.extend({
		tagName: "div",
		className: "bookContainer",
		template: $("#bookTemplate").html(),
		
		render: function() {
			var tmpl = _.template(this.template);
			this.$el.html(tmpl(this.model.toJSON()));
			return this;
		},
		events: {
			"click .delete": "deleteBook"	
		},
		deleteBook: function() {
			this.model.destroy();
			this.remove();
		}
	});
	
	var LibraryView = Backbone.View.extend({
		el: $("#books"),
		initialize: function() {
			this.collection = new Library(books);
			this.render();
			
			this.collection.on("add", this.renderBook, this);//the collection provides the added model as a parameter to the event
			this.collection.on("remove", this.removeBook, this);//the collection provides the removed model as a parameter to the event
		},
		render: function() {
			var that = this;
			this.collection.each(function(model) {
				that.renderBook(model);							  
			});
		},
		events: {
			"click #add": "addBook"	
		},
		addBook: function(e) {
			e.preventDefault();
			var formData = {};
			$("#addBook div").children("input").each(function(i, el) {
				if($(el).val() != "") formData[el.id] = $(el).val();
			});
			books.push(formData);
			this.collection.add(new Book(formData));
		},
		renderBook: function(model) {//相当于todo中的addone
			var bookView = new BookView({model: model});
			this.$el.append(bookView.render().el);
		},
		removeBook: function(removedBook) {
			console.log(removedBook);
		}
	});

	var libraryView = new LibraryView();
})(jQuery);