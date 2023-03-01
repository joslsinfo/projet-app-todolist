class TodoList {

    constructor(todo) {
        this.todo = todo;
    }

    static Builder = class {
        static title = null;
        static content = null;
        static timeLimit = null;
        static done = false;
        static doneAt = null;

        static withTitle(title) {
            this.title = title;
            return this;
        }
        
        static withContent(content) {
            this.content = content;
            return this;
        }

        static withTimeLimit(timeLimit) {
            this.timeLimit = timeLimit;
            return this;
        }
        static withDone(done) {
            this.done = done;
            return this;
        }
        static withDoneAt(doneAt) {
            this.doneAt = doneAt;
            return this;
        }

        static build() {
            return new TodoList({title: this.title, content: this.content, timeLimit: this.timeLimit, done: this.done, doneAt: this.doneAt}).todo;
        }
    }
}

export default TodoList;
