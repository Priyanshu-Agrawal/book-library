import {Image, Text, TouchableOpacity, View} from "react-native";

const BookCard = ( {book, book : {work}, isReaded, handleBookReadToggle}) => {
	const {key, title, author_names, cover_id, first_publish_year, cover_i, author_name} = work || book;
	// console.log(cover_id, title, author_names);
	return (
		<View className={'relative flex w-max my-2 p-2 border border-gray-200 rounded-2xl flex-row shadow'} key={key} onPressIn={() => handleBookReadToggle(key)}>
			<View className={'flex w-[30%] aspect-square justify-center'}>
				<Image style={{resizeMode:'contain'}} className={'w-full h-full object-contain '} source={{uri: `https://covers.openlibrary.org/b/id/${cover_id || cover_i}-M.jpg`}} alt={title}  />
			</View>
			<View className={'w-[70%] overflow-hidden flex flex-col justify-start'}>
				<Text className={'font-bold text-base leading-5'}>{title}</Text>
				<Text className={'text-gray-600'}>{author_names || author_name}</Text>
				<Text className={'text-gray-600'}>{first_publish_year}</Text>
			</View>
			<TouchableOpacity className={'absolute bottom-2 right-2 text-white w-20 text-center rounded-md'} onPress={() => handleBookReadToggle(key)}>
				<Text className={`border ${isReaded ? 'border-green-800 bg-green-700 text-white' : 'border-red-800 text-red-800'}  py-1 px-2 text-center rounded-xl`}>{isReaded ? 'Read' : 'Not Read'}</Text>
			</TouchableOpacity>
		</View>
	)
}

export default BookCard;