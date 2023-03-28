import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { HuePicker, SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio'
import { state } from '../store/store'
import { memo, useEffect, useState } from 'react';

export function Overlay() {
    const snap = useSnapshot(state)
    const transition = { type: 'spring', duration: 0.8 }
    const config = {
        initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
        animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
        exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
    }

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} className="overlay--wrapper">

        <AnimatePresence>
            {snap.intro ? (
            <motion.section key="main" {...config}>
                <div className="section--container">
                <motion.div
                    key="title"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 5, stiffness: 50, restDelta: 0.001, duration: 0.3 }}>
                    <h1>Hue your pet</h1>
                </motion.div>
                <div className="support--content">
                    <motion.div
                    key="p"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        damping: 7,
                        stiffness: 30,
                        restDelta: 0.001,
                        duration: 0.6,
                        delay: 0.2,
                        delayChildren: 0.2
                    }}>
                    <p>
                        Customize your <strong>furry friend</strong> with a unique color scheme.
                    </p>
                    <button style={{ background: snap.color }} onClick={() => (state.intro = false)}>
                        CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                    </button>
                    </motion.div>
                </div>
                </div>
            </motion.section>
            ) : (
            <motion.section key="custom" {...config}>
                <Customizer />
            </motion.section>
            )}
        </AnimatePresence>
        </div>
    )
}

const Customizer = memo(() => {
    const snap = useSnapshot(state)

    const [showColorPicker, setShowColorPicker] = useState(false);
    const [color, setColor] = useState('#EFBD4E');

    const handleColorChange = (selectedColor) => {
        setColor(selectedColor.hex);
        state.color = selectedColor.hex;
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
          if (!event.target.closest('.color-picker-popup-inner') && !event.target.closest('.circle.multicolor')) {
            setShowColorPicker(false);
          }
        };
    
        if (showColorPicker) {
          document.addEventListener('click', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [showColorPicker]);

    return (
    <div className="customizer">
        <div className="color-options">
        {snap.colors.map((color) => (
            <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
        ))}
        
        <div className="circle multicolor" onClick={() => setShowColorPicker(!showColorPicker)} />


        </div>
        {showColorPicker && (
            <div className="color-picker-popup">
                <div className="color-picker-popup-inner" onClick={(e) => e.stopPropagation()}>
                <HuePicker
                    color={color}
                    onChange={handleColorChange}
                />
                </div>
            </div>
        )}
        <button
        className="share"
        style={{ background: snap.color }}
        onClick={() => {
            const link = document.createElement('a')
            link.setAttribute('download', 'my-custom-pet.png')
            link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
        }}>
        TAKE PICTURE
        <AiFillCamera size="1.3em" />
        </button>
        <button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
        </button>
        <div className="models">
            {
                snap.models.map((model) => (
                    <img key={ model } src={`./${model}.png`} onClick={ () => { state.model = model } } className={`${ snap.model === model && 'selected' }`} />
                ))
            }
        </div>
    </div>
    )
});

export default Overlay;