import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const storage = {
    fetch() {
        let arr = [];
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
                    arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
                }
            }
        }
        return arr;
    }
}

export const store = new Vuex.Store({
    state: {
        todoItems: storage.fetch()
    },
    mutations: {
        addOneItem(state, todoItem) {
            let obj = { completed: false, item: todoItem }
            localStorage.setItem(todoItem, JSON.stringify(obj))
            state.todoItems.push(obj);
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item)
            state.todoItems.splice(payload.index, 1)
        },
        toggleOneItem(state, todoItem) {
            todoItem.completed = !todoItem.completed
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem))
        },
        removeAllItem(state) {
            localStorage.clear();
            state.todoItems = [];
        }
    }
})