(function () {
    window.App = {
        Models: {},
        Collections: {},
        Views: {}
    };

    window.template = function (id) {
        return _.template($('#' + id).html());
    };

    App.Models.Task = Backbone.Model.extend({
        validate: function (attrs) {
            if (!attrs.title || !$.trim(attrs.title)) {
                throw new ReferenceError('Put a valid title!');
            }
        }
    });

    App.Collections.Tasks = Backbone.Collection.extend({
        type: App.Models.Task
    });

    App.Views.Tasks = Backbone.View.extend({
        tagName: 'ul',

        initialize: function () {
            this.collection.on('add', this.addOne, this);
        },

        render: function () {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function (task) {
            //creating new child view
            var taskView = new App.Views.Task({ model: task });
            /*	taskView.render();*/
            //append to the root el
            this.$el.append(taskView.render().el);
        }
    });

    App.Views.Task = Backbone.View.extend({
        tagName: 'li',

        initialize: function () {
            /*_.bindAll(this, 'editTask', 'render');*/ // bind kontekstu metod

            this.model.on('change', this.render, this); // kiedy-metoda-kontekst
            this.model.on('destroy', this.remove, this);
        },

        template: template('taskTemplate'),

        events: {
            'click .edit': 'editTask',
            'click .delete': 'destroy'
        },

        destroy: function () {
            this.model.destroy();
            console.log(tasksCollection);
        },

        remove: function () {
            this.$el.remove();
        },

        editTask: function () {
            var newTaskTitle = prompt('What?', this.model.get('title'));
            if (!newTaskTitle || !$.trim(newTaskTitle)) return;

            this.model.set('title', newTaskTitle, { validate: true });

        },

        render: function () {
            var template = this.template(this.model.toJSON());
            this.$el.html(template);
            return this;
        }

    });

    App.Views.AddTask = Backbone.View.extend({
        el: '#addTask',

        events: {
            'submit': 'submit'
        },

        submit: function (e) {
            e.preventDefault();
            var newTaskTitle = $(e.currentTarget).find('input[type=text]').val();
            //{validate:true}!
            var task = new App.Models.Task({ title: newTaskTitle }, { validate: true });
            this.collection.add(task);
        }

    });

    window.tasksCollection = new App.Collections.Tasks([
        {
            title: 'Go to the store'

        },
        {
            title: 'Go to school'
        },
        {
            title: 'Eas dinner'
        }
    ]);

    var tasksView = new App.Views.Tasks({ collection: tasksCollection });

    // Nie używane...
    var addTaskView = new App.Views.AddTask({ collection: tasksCollection });

    $('.tasks').html(tasksView.render().el);
}());
