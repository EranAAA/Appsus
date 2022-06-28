import { eventBusService } from "../../../services/event-bus-service.js"

export class NoteSearch extends React.Component {
    state = {
        searchByKeep: ''
    }

    handleChange = ({ target }) => {
        const { name } = target
        this.setState(() => ({ [name]: target.value }))
        const { searchByKeep } = this.state
        eventBusService.emit('search-keep', searchByKeep)
    }

    onSave = (ev) => {
        ev.preventDefault()
        
    }

    render() {
        const { searchByKeep } = this.state
        return (
            <section className='email-filter'>
                <form onSubmit={this.onSave}>
                    <input
                        type='search'
                        name='searchByKeep'
                        value={searchByKeep}
                        onChange={this.handleChange}
                        placeholder='Search keep'
                    />
                </form>
            </section>
        )
    }
}
