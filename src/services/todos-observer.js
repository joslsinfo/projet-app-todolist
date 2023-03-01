


class TodosObserver {

    constructor(todos) {
        this.td = this.createTodosObjects(todos);
    }

    createTodosObjects(todos) {
        return Object.values(todos).reduce((acc, value) => {
            if (!acc[value]) {
                acc = {
                    ...acc,
                    [value]: []
                }
            }
            return acc;
        }, {})
    }

    subscribe(todo, callback) {
        if (!this.td[todo]) {
            this.td[todo] = [];
        }
        this.td[todo].push(callback);

        return () => this.unsubscribe(todo, callback)
    }

    unsubscribe(todo, callback) {
        if (!this.td[todo]) return;
        this.td[todo] = this.td[todo].filter(cb => cb !== callback);
    }


    publish(todo, ...args) {
        if (!this.td[todo]) return;
        this.td[todo].forEach(cb => cb(...(args || [])));
    }


    

}

export default TodosObserver


export const todoEvents = {
    onCreate: 'onCreate',
    onUpdate: 'onUpdate',
    onDelete: 'onDelete',
  };

