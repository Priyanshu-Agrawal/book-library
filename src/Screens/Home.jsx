import {useEffect, useState} from "react";
import axios from "axios";
import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import SearchBar from "../components/SearchBar";
import BooksContainer from "../components/BooksContainer";
import {debounce} from "lodash";

export default function Home() {
	const [books, setBooks] = useState([]);
	const [searchedBooks, setSearchedBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	const filterOutBadData = (data) => {
		return data.filter(item => item.work ? (item.work.cover_id && item.work.title && item.work.author_names) : item.cover_i && item.title && item.author_name)
	}
	
	const fetchBooks = async () => {
		const {data : { reading_log_entries}}  = await axios.get("https://openlibrary.org/people/mekBot/books/already-read.json")
		return reading_log_entries
	}
	
	useEffect(() => {
		setIsLoading(true)
		fetchBooks().then(r => {
			setBooks(filterOutBadData(r))
			setIsLoading(false)
		})
	}, []);
	
	
	const debouncedSearch = debounce(async (search) => {
		setIsLoading(true)
		if(search.length > 2) {
			const encodedSearch = encodeURIComponent(search);
			const {data: {docs}} = await axios.get(`https://openlibrary.org/search.json?title=${encodedSearch}`)
			setSearchedBooks(filterOutBadData(docs))
		}else {
			setSearchedBooks([])
		}
		setIsLoading(false)
	}, 300);
	
	const onSearch = (search) => {
		debouncedSearch(search)
	}
	
	
	return (
		<View className="flex items-center justify-center bg-white">
			<StatusBar style="auto" translucent={false} backgroundColor={'white'} animated={true}/>
			<SearchBar onSearch={onSearch} />
			{isLoading && <Text>Loading...</Text>}
			<BooksContainer books={books} searchedBooks={searchedBooks}/>
		</View>
	);
}

