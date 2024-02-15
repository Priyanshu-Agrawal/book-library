import {ScrollView} from "react-native";
import BookCard from "./BookCard";
import {useState} from "react";

export default function BooksContainer({books, searchedBooks}) {
	const [readBooks, setReadBooks] = useState([]);
	
	const handleReadStatusToggle = async (key) => {
		if(readBooks.includes(key)){
			setReadBooks(readBooks.filter(book => book !== key))
		}else{
			setReadBooks([...readBooks, key])
		}
	};
	
	return (
		<ScrollView className={'bg-white px-10'}>
			{searchedBooks.length > 0 ? searchedBooks.map((book, idx) => (
					<BookCard key={book.key ?? idx} book={book} isReaded={readBooks.includes(book.key)} handleBookReadToggle={handleReadStatusToggle}/>
				))
				:
				books.map((book, idx) => (
					<BookCard key={book.key ?? idx} book={book} isReaded={readBooks.includes(book.work.key)} handleBookReadToggle={handleReadStatusToggle}/>
				))
			}
		
		</ScrollView>
	);
}