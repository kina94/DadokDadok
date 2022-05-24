import React, { useState, useEffect } from 'react'
import BookInfo from '../book/BookInfo'
import BookList from '../book/BookList'
import BookSave from '../book/BookSave'

function BookResult(props) {
    const [isToggle, setIsToggle] = useState(false)
    const [selectedBook, setSelectedBook] = useState([])
    const [saveBook, setSaveBook] = useState({})

    // 검색 결과창에서 원하는 책 클릭 시 모달 토글을 위해 state 설정
    const onClickBook = (e) => {
        const id = e.target.closest('li').id
        const book = props.books[id]
        setIsToggle(true)
        setSelectedBook(book)
    }

    // 모달 없애기
    const handleModalClose = () => {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setIsToggle(false)
            }
        })
        window.addEventListener('click', (e) => {
            try {
                if (e.target.className === 'book-info') {
                    setIsToggle(false)
                }
                if (e.target.closest('button').className === 'close') {
                    setIsToggle(false)
                }
            } catch {
                return
            }

        })
    }

    useEffect(() => {
        handleModalClose()
    }, [])

    return (
        <ul>
            <span>{props.message}</span>
            <BookList books={props.books} alertMessage='검색 결과가 없습니다.'
                clickEvent={onClickBook}></BookList>
            {
                isToggle ?
                    <div className='book-info'>
                        <div className='content-wrapper'>
                            <BookInfo selectedBook={selectedBook} />
                            <BookSave userInfo={props.userInfo} selectedBook={selectedBook}></BookSave>
                        </div>
                    </div> : null
            }
        </ul>
    )
}
export default BookResult