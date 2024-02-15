import {TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {useEffect, useState} from "react";

const SearchBar = ({ onSearch }) => {
	const [search, setSearch] = useState('');
	
	const handleSearch = () => {
		// console.log(search)
		onSearch(search);
	}
	
	useEffect(() => {
		// console.log(search)
		onSearch(search);
	}, [search]);
	return (
		<View className={'relative w-full px-2 py-3 flex flex-row border-b items-center mb-2'}>
			<TextInput className={'flex-1 px-4'} type="text" placeholder={'Search...'} value={search} onChangeText={(text)=> setSearch(text)}/>
			<TouchableOpacity className={'absolute right-4'} onPress={handleSearch}>
				<AntDesign name={'search1'} size={24} color={'black'}/>
			</TouchableOpacity>
		</View>
	);
}

export default SearchBar;