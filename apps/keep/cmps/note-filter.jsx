const {NavLink} = ReactRouterDOM

export class NoteFilter extends React.Component  {

    state = {
        input: ''
    }

    onSubmit = (ev) => {
        ev.preventDefault()
        const { text, type } = this.state
        this.props.handleAddNote(text, type)
        this.setState({ input: '' })
    }

    handleChange = ({ target }) => {
        const text = target.value
        this.setState({ input })
    }


    render() {
    const {handleFilterChange} = this.props
    return <section className="note-filter">
        {/* <input type="text" placeholder="Search a note" className="filter-input" onChange="handleChange"/> */}
        <NavLink to="/keep/all" ><div className="filter-btn" onClick={()=>handleFilterChange('')}> All </div></NavLink>
        <NavLink to="/keep/text"><div className="filter-btn" onClick={()=>handleFilterChange('text')}> Text </div></NavLink>
        <NavLink to="/keep/image"><div className="filter-btn" onClick={()=>handleFilterChange('image')}> Images </div></NavLink>
        <NavLink to="/keep/video"><div className="filter-btn" onClick={()=>handleFilterChange('video')}> Videos </div></NavLink>
        {/* <div className="filter-btn" onClick={handleFilterChange('todo')}> Todos </div> */}
    </section>
}

}