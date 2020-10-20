import React,{useEffect,useState}  from 'react'
import Modal from 'react-modal';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      width                 :"500px",
      height                :"fit-content",
      marginRight           : '-50%',
      borderColor           :'var(--colorPrimaryDark)'   ,  
      transform             : 'translate(-50%, -50%)',
      overflowY             :'hidden' ,
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
};

const PorductModal=({modalIsOpen,setIsOpen,addToCart,product}) =>{
    const {title,image,price,description,sizes,id}=product
    const [open, setopen] = useState(false)

    useEffect(() => {
        if(modalIsOpen)setopen(true)
    }, [modalIsOpen])


    const afterOpenModal=()=> {
      // references are now sync'd and can be accessed.
         document.body.style.overflowY="hidden"
    }
    const afterCloseModal=()=> {
        document.body.style.overflowY="scroll" 
        setIsOpen(false);
    }
    const closeModal=()=>{
      setopen(false)
    }

    return (
        <Modal
            isOpen={open}
            style={customStyles}
            onAfterOpen={afterOpenModal}
            onAfterClose={afterCloseModal}
            onRequestClose={closeModal}
            shouldCloseOnEsc={true}        
            overlayClassName="modalOverlay"
            contentLabel="Product title"    
         >
                 <div  className="modal" style={{display:open?'flex':'none'}} >
                    <div className="productItem__image">
                           <img  src={image}  />
                    </div>
                    <div>
                           <p className="productItem__title">{title} </p>
                           <p className="productItem__description">{description}</p>
                           <div className="productItem__sizes">
                               <p>Avaiable sizes :</p>
                               <ul> {sizes.map((s,i)=><li key={i}>{s}</li>)}</ul>
                           </div>
                           <div className="productItem__bottom">
                               <p>${price}</p>
                               <button onClick={()=>addToCart(product)} className="btn">Add to cart</button>
                           </div>
                    </div>
                 </div>

         </Modal>
    )
}

export default PorductModal
