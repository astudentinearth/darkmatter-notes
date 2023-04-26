import { useState,useEffect,useRef } from "react";

export default function useComponentVisible(initalIsVisible:boolean){
    const [isComponentVisible,setIsComponentVisible] = useState(initalIsVisible);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref:any = useRef(null);
    const handleClickOutside = (event:MouseEvent)=>{
        
        if(ref.current && !ref.current.contains(event.target)){
            setIsComponentVisible(false);
        }
    };
    useEffect(()=>{
        document.addEventListener('click',handleClickOutside,true);
        return ()=>{
            document.removeEventListener('click',handleClickOutside,true);
        };
    },[]);
    return {ref,isComponentVisible,setIsComponentVisible};
}