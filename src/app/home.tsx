import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { api } from "@/services/api";
import { Categories, CategoriesProps } from "@/components/Categories";
import { PlaceProps } from "@/components/place";
import {Places} from '@/components/places'

type MarketsProps = PlaceProps

export default function Home(){
    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState("")
    const [markets, setMarkets] = useState<MarketsProps[]>([])

    async function fetchCategories(){
        try{
            const {data} = await api.get("/categories")
            setCategories(data)
            setCategory(data[0].id)
        }catch(error){
            Alert.alert("Categorias","Não foi possível carregar as categorias.")
        }
    }

    async function fetchMarkerts(){
        try {
            if(!category){
                return
            }

            const {data} = await api.get("/markets/category/" + category)
            setMarkets(data)
        } catch (error) {
            Alert.alert("Locais","Não foi possível carregar os locais")
        }
    }
    useEffect(()=>{
        fetchCategories()
    },[])

    useEffect(()=>{
        if(category){
            fetchMarkerts()
        }
    },[category])

    return(
        <View style={{flex:1, backgroundColor:'#CECECE'}}>
            <Categories data={categories} onSelect={setCategory} selected={category}/>
            <Places data={markets} />
        </View>
    )
}