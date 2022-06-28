import { storageService } from "../../../services/storage.service.js"
import { utilService } from "../../../services/util.service.js"

export const noteService = {
    query,
    addNote,
    removeNote,
    changeNoteColor,
    changeNoteText,
    changePin,
    csvToTodo
}

const NOTES_KEY = 'noteDB'

const gNotes = [
    {
        id: "n101",
        type: "text",
        isPinned: false,
        info: {
            txt: "Been running up the hill",
            color: 'white'
        }
    },
    {
        id: "n102",
        type: "video",
        isPinned: false,
        info: {
            txt: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
            color: '#F9FFA4'
        }
    },
    {
        id: "n110",
        type: "text",
        isPinned: false,
        info: {
            txt: `
            Nobody likes you when you're twenty-three
            And you still act like you're in freshman year`,
            color: 'white'
        }
    },
    
    {
        id: "n103",
        type: "text",
        isPinned: false,
        info: {
            txt: `And if I only could
            I'd make a deal with God
            And I'd get him to swap our places
            Be running up that road
            Be running up that hill
            Be running up that building`,
            color: 'white'
        }
    },
    
    {
        id: "n104",
        type: "image",
        isPinned: true,
        info: {
            txt: `https://thumbs.dreamstime.com/b/crazy-cat-tongue-hanging-out-40087599.jpg`,
            color: '#B4FF9F'
        }
    },
    
    {
        id: "n109",
        type: "text",
        isPinned: false,
        info: {
            txt: `And that's about the time she walked away from me
            Nobody likes you when you're twenty-three
            And you still act like you're in freshman year
            What the hell is wrong with me?
            My friends say I should act my age
            What's my age again?`,
            color: '#E87373'
        }
    },
    {
        id: "n108",
        type: "image",
        isPinned: false,
        info: {
            txt: `https://cdn.britannica.com/79/191679-050-C7114D2B/Adult-capybara.jpg`,
            color: 'white'
        }
    },
    {
        id: "n106",
        type: "image",
        isPinned: false,
        info: {
            txt: `https://storage.googleapis.com/pod_public/1300/100862.jpg`,
            color: '#FEB8FF'
        }
    },
    {
        id: "n105",
        type: "text",
        isPinned: true,
        info: {
            txt: `Say, if I only could
        I'd make a deal with God
        And I'd get him to swap our places
        I'd be running up that road
        Be running up that hill
        With no problems`,
        color: 'white'
        }
    },
    {
        id: "n113",
        type: "todo",
        isPinned: true,
        info: {
            txt: `Shopping, banana, almond-milk, peanut-butter`,
        color: 'white'
        }
    },
    {
        id: "n111",
        type: "text",
        isPinned: false,
        info: {
            txt: `It's not as if our lives are divided simply into light and dark.
            There's shadowy middle ground.
            Recognizing and understanding the shadows 
            is what a healthy intelligence does.
            And to acquire a healthy intelligence 
            takes a certain amount of time and effort.`,
        color: 'white'
        }
    },
    {
        id: "n112",
        type: "text",
        isPinned: false,
        info: {
            txt: `This is a first, I think. Or is it?`,
        color: 'lightblue'
        }
    },
    {
        id: "n107",
        type: "video",
        isPinned: true,
        info: {
            txt: `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4`,
            color: '#F9EEA4'
        }
    }
]




function query(filterBy, search) {
    let notes = storageService.loadFromStorage(NOTES_KEY)
    if (!notes || notes.length === 0) {
        notes = gNotes
        storageService.saveToStorage(NOTES_KEY, notes)
    }

    if (filterBy) {
        notes = notes.filter(note => note.type === filterBy)
    }

    if (search) {
        notes = notes.filter(note => note.info.txt.toLowerCase().includes(search.toLowerCase()))
    }

    return Promise.resolve(notes)
}

function addNote(txt, type) {
    let notes = storageService.loadFromStorage(NOTES_KEY)

    const newNote = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info: {
            txt,
            color: 'white'
        }
    }

    notes.unshift(newNote)
    storageService.saveToStorage(NOTES_KEY, notes)

    return Promise.resolve()
}

function _getNoteIdxById(noteId) {
    console.log(noteId)
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = notes.findIndex(note => noteId === note.id)

    return noteIdx
}

function _getNoteById(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const note = notes.find(note => noteId === note.id)

    return note
}

function removeNote(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    console.log(notes)
    const noteIdx = _getNoteIdxById(noteId)
    notes.splice(noteIdx, 1)
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()

}

function changeNoteColor(noteId, color) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdxById(noteId)
    notes[noteIdx].info.color = color
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

function changeNoteText(noteId, text) {
    console.log(text)
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdxById(noteId)
    notes[noteIdx].info.txt = text
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

function changePin(noteId) {
    const notes = storageService.loadFromStorage(NOTES_KEY)
    const noteIdx = _getNoteIdxById(noteId)
    notes[noteIdx].isPinned = !notes[noteIdx].isPinned
    storageService.saveToStorage(NOTES_KEY, notes)
    return Promise.resolve()
}

function csvToTodo(csv) {
    const list = csv.split(",")
    const header = list.shift()
    const todos = list.map(todo => ({
        id: utilService.makeId(),
        text: todo,
        isDone: 'none'
    }))
    return({todos, header})
}