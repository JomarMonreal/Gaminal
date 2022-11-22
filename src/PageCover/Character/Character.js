import React from 'react'
import {useState,useRef,useEffect,useLayoutEffect,forwardRef} from 'react'
import './character.css'

const Character = forwardRef((props,pageCoverRef) => {
    const updateDelta=0.5;
    const pageCoverRect= useRef({});

    const characterHeight=20;
    const characterWidth=characterHeight*0.2;
    const characterSpeed=1.5;
    const updatedCharacterSpeed=characterSpeed*updateDelta;
    
    const characterRef=useRef();
    const characterRect = useRef({});
    const characterStates={idle:"character",walk:"character walk",slide:"character"}
    const [characterClass, setCharacterClass] = useState(characterStates.idle);
    const isFacingLeft = useRef(1);
    const [characterPosition,setCharacterPosition]=useState({
        x:0,
        y:100-characterHeight
    });
    let targetPosition=useRef({});
    const isMoving=useRef(false);
    
    const jumpTimeLimit=30;
    const jumpSpeed=0.001;
    
    const isJumping = useRef(false);
    const isFalling=useRef(false);
    const jumpTime = useRef(jumpTimeLimit);
    const jump = () => { 
        //removekeybinding on scrolling
        if(isJumping.current===false) {
            return
        }
        
        if(isFalling.current===false){
            const targetPositionY=targetPosition.current.y-jumpTime.current*jumpTime.current*jumpSpeed;
            targetPosition.current={x:targetPosition.current.x, y:targetPositionY}
            
            if(jumpTime.current<=0) {
                isFalling.current=true
            } else{
                jumpTime.current=jumpTime.current-1;
            }
        }
        else{
            const targetPositionY=targetPosition.current.y+jumpTime.current*jumpTime.current*jumpSpeed;
            targetPosition.current={x:targetPosition.current.x, y:targetPositionY}
            
            if(jumpTime.current>=jumpTimeLimit){
                console.log(isFalling,isJumping)
                isFalling.current=false
                isJumping.current=false
                isMoving.current=false
            } else{
                jumpTime.current=jumpTime.current+1;
            }
        }
        setCharacterPosition(current=>{return{...current,...targetPosition.current}});
    }
    

    useLayoutEffect(() => {
        characterRect.current= characterRef.current.getBoundingClientRect();
        pageCoverRect.current=pageCoverRef.current.getBoundingClientRect();
    }, [characterPosition])

    useEffect(() => {
        //input reading block

        window.addEventListener("keydown",(e)=>{
            if(e.key==='ArrowUp'){
                e.preventDefault()
            }
        },false)
        let keysPressed={};
        document.onkeydown = (e) => {
            e = e || window.event;
            keysPressed[e.key]=true;
            console.log(keysPressed)
            if (keysPressed['ArrowUp']) {
                if(isJumping.current===false){
                    setCharacterClass(characterStates.idle);
                    isJumping.current=true
                    isMoving.current=true
                }
                jump()
            } 
            if (keysPressed['ArrowLeft']) {
                if (isFacingLeft.current===-1) isFacingLeft.current=isFacingLeft.current*-1;
                if(characterClass!==characterStates.walk) setCharacterClass(characterStates.walk);
                if(characterRect.current.x>0) {
                    if(isNaN(targetPosition.current.x)) {targetPosition.current={...characterPosition, x:characterPosition.x-updatedCharacterSpeed}}
                    else {targetPosition.current={...targetPosition.current, x:targetPosition.current.x-updatedCharacterSpeed};}
                }
                isMoving.current=true
            } 
            if (keysPressed['ArrowRight']) {
                if(isFacingLeft.current===1) isFacingLeft.current=isFacingLeft.current*-1;
                if(characterClass!==characterStates.walk) setCharacterClass(characterStates.walk);
                if(characterRect.current.right<pageCoverRect.current.right-2){
                    if(isNaN(targetPosition.current.x)) {targetPosition.current={...characterPosition, x:characterPosition.x+updatedCharacterSpeed}}
                    else {targetPosition.current={...targetPosition.current, x:targetPosition.current.x+updatedCharacterSpeed};}
                }
                isMoving.current=true
            }
            if (isMoving.current===true){
                setCharacterPosition(current=>{return{...current,...targetPosition.current}});
            }
        }
        
        
        document.onkeyup = (e) => {
            e = e || window.event;
            if (keysPressed['ArrowUp']) {
                setCharacterClass(characterStates.idle);
                delete keysPressed['ArrowUp']
            } 
            if (keysPressed['ArrowLeft']) {
                setCharacterClass(characterStates.idle);
                delete keysPressed['ArrowLeft']
            } 
            if (keysPressed['ArrowRight']) {
                setCharacterClass(characterStates.idle);
                delete keysPressed['ArrowRight']
            }
            if(Object.keys(keysPressed).length===0){
                isMoving.current=false
            }
            if (isMoving.current===true){
                setCharacterPosition(current=>{return{...current,...targetPosition.current}});
            }   
        }
        
        
    }, [])
    
    // useEffect(()=>{
    //     jump()
    // },[characterPosition])

    return (
        <div className={characterClass} 
        ref={characterRef}
        style={{
            height:`${characterHeight}%`,
            width:`${characterWidth}%`,
            top: `${characterPosition.y}%`,
            left: `${characterPosition.x}%`,
            transform: `scaleX(${isFacingLeft.current})`
        }}
        >
        </div>
    )
});

export default Character