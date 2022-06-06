import {Page} from "@core/Page"
import {TestList} from "../components/testList/TestList"
import {$} from '@core/dom'
import {Navbar} from '@/components/navbar/Navbar'

export class TestListPage extends Page {
    constructor(params, store){
        super(params)
        this.params = params
        this.store = store
    }

    getRoot() {
        const $root = $.create('div', 'test__list')
        const admin = this.store.getState().token
        const components = []

        if (admin) {
            components.push(Navbar)
        }

        this.testList = new TestList($root, {
            components,
        }, this.store)

        return this.testList.getRoot()
    }

    afterRender() {
        this.testList.init()
    }

    destroy() {
        this.testList.destroy()
    }
}