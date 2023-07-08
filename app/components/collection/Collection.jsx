import { useRef,useState, useLayoutEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Nft from '../nft/Nft'
import pinnedSvg from '../../assets/icons/pin.svg'
import styles from '../styles/collections.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper';
import useWindowDimensions from '../../hooks/useWindow'
import 'swiper/css';
import 'swiper/css/navigation';


export default function Collection({collection}) {
    const currentCollection = useRef(null)
    const swiperRef = useRef(null)
    const prevArrow = useRef(null)
    let currentTranform = 0
    
    const [swipeValue,setSwipeValue] = useState(309.25)
    const [slides,setSlides] = useState(4)
    const [spaceBetween,setSpaceBetween] = useState(17)
    const {width} = useWindowDimensions()

    const router = useRouter()

    const navigateToCollection = () => {
        router.push(`/marketplace/collection/${collection._id}`)
    }

    const toggleShowAllBtn = (action) => {
        const showBtn = currentCollection.current.querySelector('#show-all-btn')

        if(action === 'over'){
            showBtn.classList.add('hide-item')
        }else if(action === 'out'){
            showBtn.classList.remove('hide-item')
        }
    }

    const onSwipe = (swiper) => {
        const translateValue = Math.abs(swiper.translate)

        if(translateValue === 0){
            prevArrow.current.style.display = 'none'
        }else{
            prevArrow.current.style.display = 'block'
        }
            
        currentTranform =  translateValue
    }

    const swiperHandler = (action = 'next-slide' || 'prev-slide') => {
        const currentNftsRow = currentCollection.current.querySelector('.swiper-wrapper')
        
        const maxTranslate = (currentNftsRow.children.length - 4) * swipeValue

        if(action === 'next-slide'){
            nextSlide(maxTranslate,currentNftsRow)
        }

        if(action === 'prev-slide'){
            prevSlide(maxTranslate,currentNftsRow)
        }
    }

    const nextSlide = (maxTranslate,nftsRow) => {
        if(maxTranslate <= currentTranform){
            currentTranform = 0

            prevArrow.current.style.display = 'none'

            nftsRow.style.transition = `0.3s ease`

            nftsRow.style.transform = `translate3d(${currentTranform}px,0px,0px)`

            return
        }

        prevArrow.current.style.display = 'block'

        currentTranform = currentTranform + swipeValue

        nftsRow.style.transition = `0.3s ease`

        nftsRow.style.transform = `translate3d(-${currentTranform}px,0px,0px)`
    }

    const prevSlide = (maxTranslate,nftsRow) => {
        if((currentTranform - swipeValue) <= 0){
            currentTranform = 0

            prevArrow.current.style.display = 'none'

            nftsRow.style.transition = `0.3s ease`

            nftsRow.style.transform = `translate3d(-${currentTranform}px,0px,0px)`

            return
        } 

        currentTranform = currentTranform - swipeValue

        nftsRow.style.transition = `0.3s ease`

        nftsRow.style.transform = `translate3d(-${currentTranform}px,0px,0px)`
    }

    useLayoutEffect(() => {
        if(width > 1316){
            setSlides(4) 
            setSpaceBetween(17)
        }

        if(width < 1316 && width > 1000){
            setSlides(3.3)
            setSpaceBetween(17)
        }

        if(width < 1000 && width > 940){
            setSlides(3)
            setSpaceBetween(17)
        }

        if(width < 940 && width > 840){
            setSlides(2.5)
            setSpaceBetween(17)
        }

        if(width < 840 && width > 640){
            setSlides(2.15)
            setSpaceBetween(17)
        }
        if(width < 640 && width > 560){
            setSlides(1.95)
            setSpaceBetween(17)
        }
        if(width < 560 && width > 460){
            setSlides(1.5)
            setSpaceBetween(17)
        }
        if(width < 460 && width > 420){
            setSlides(1.36)
            setSpaceBetween(17)
        }
        if(width < 420){
            setSlides(0.9995)
            setSpaceBetween(15)
        }
    },[width])

  return (
    <div ref={currentCollection} className={styles.collection}>
            <div className={styles.head}>
                <div className={styles.collectionTitle}>
                    {collection.title}
                </div>
                {
                    collection.isPinned 
                    ?
                    <Image className={styles.pinned} src={pinnedSvg} alt='pinned'/>
                    :
                    <></>
                }
            </div>
            <div className={styles.nftsWrapper}>
            <button 
            style={{display:'none'}}
            ref={prevArrow}
            className={styles.arrowBtn + ' ' + styles.prevBtn}
            onClick={() => swiperHandler('prev-slide')}
            >
                <svg width="21" height="31" viewBox="0 0 21 31" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.563495 15.5001L15.8757 30.8124L20.2502 26.4378L9.31247 15.5001L20.2502 4.56231L15.8757 0.187856L0.563495 15.5001Z" />
                </svg>
            </button>
            <div className={styles.nfts}>
            <Swiper
            ref={swiperRef}
            className='nfts-swiper'
            onSlideChange={onSwipe}
            modules={[Scrollbar, A11y]}
            spaceBetween={spaceBetween}
            slidesPerView={slides || 4}
            >
                {
                    collection.nfts.map((nft) => {
                        return (
                            <SwiperSlide  className='nft-slide' key={nft._id}>
                                <Nft 
                                toggleShowAllBtn={toggleShowAllBtn} 
                                nft={nft}/>
                            </SwiperSlide>
                        )
                    })  
                }
            </Swiper>
            </div>
            <button 
            className={styles.arrowBtn}
            onClick={() => swiperHandler('next-slide')}
            >
                <svg width="35" height="35" viewBox="0 0 35 35">
                    <path d="M28.4367 17.5L13.1245 2.18774L8.75 6.56233L19.6878 17.5L8.75 28.4378L13.1245 32.8123L28.4367 17.5Z"  />
                </svg>
            </button>
            <div  className={styles.showAll} id='show-all-btn'>
                <button onClick={navigateToCollection}>
                Show all {'>'}
                </button>
            </div>
            </div>

    </div>
  )
}