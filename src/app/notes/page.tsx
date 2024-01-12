import Link from 'next/link'
import CreateNote from './CreateNote'
import styles from './Notes.module.css'

const getNotes = async () => {
    const res = await fetch('http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=30', {
        cache: 'no-store'
    })
    const data = await res.json()
    return data?.items as any[]
}

const NotesPage = async () => {
    const notes = await getNotes()

    return (
        <div>
            <h1>Notes</h1>
            <div className={styles.grid}>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note} />
                })}
            </div>

            <CreateNote />
        </div>
    )
}

const Note = ({ note }: any) => {
    // console.log(note)
    const { id, title, content, created } = note || {}

    return (
        <Link href={`/notes/${id}`}>
            <div className={styles.note}>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    )
}

export default NotesPage
