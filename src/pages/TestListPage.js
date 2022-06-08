import {Page} from "@core/Page"
import {
    TestListContainer
} from "../components/testListContainer/TestListContainer"
import {$} from '@core/dom'
import {StoreSubscriber} from "@core/redux/StoreSubscriber"
// import {Navbar} from '@/components/navbar/Navbar'

export class TestListPage extends Page {
    constructor(params, store){
        super(params)
        this.params = params
        this.store = store
        this.subscriber = new StoreSubscriber(this.store)
    }

    getRoot() {
        const $root = $.create('div', TestListContainer.className)
        // const admin = this.store.getState().token

        // if (admin) {
        //     components.push(Navbar)
        // }

        this.testListContainer = new TestListContainer($root, {
            store: this.store,
            params: this.params
        })

        return this.testListContainer.getRoot()
    }

    afterRender() {
        this.testListContainer.init()
        this.subscriber.subscribeComponents([this.testListContainer])
    }

    destroy() {
        this.subscriber.unSubscribeFromStore()
        this.testListContainer.destroy()
    }
}