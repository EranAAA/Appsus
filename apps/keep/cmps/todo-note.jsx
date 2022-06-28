import { noteService } from "../services/note.service.js"

export class TodoNote extends React.Component {

    state = {
        header: '',
        todos: ''

    }

    componentDidMount = () => {
        const {csv} = this.props
        const todosAndHeader = noteService.csvToTodo(csv)
        const {todos, header} = todosAndHeader 
        console.log(todos, header)
        this.setState({todos})
        this.setState({header})
    }

    handleIsDone = (todo) => {
        const {todos} = this.state
        const lineIndex = todos.findIndex(line=> line.id === todo.id)
        const line = todos[lineIndex]
        if (line.isDone === 'none') line.isDone = 'line-through'
        else line.isDone = 'none'
        this.setState({todos})
    }

    render() {
        const {todos, header} = this.state

        return <React.Fragment>
            {todos && <div className="todo-note">
                <h1>{header}</h1>
                <ul>
                    {todos.map(todo => <li style={{textDecoration: todo.isDone}} onClick={()=>this.handleIsDone(todo)} key={todo.id}>{todo.text}</li>)}
                </ul>
            </div>
            }
        </React.Fragment>
    }



}