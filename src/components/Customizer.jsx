import { AiFillCamera, AiOutlineArrowLeft } from 'react-icons/ai'
import { HuePicker } from 'react-color';
import { useSnapshot } from 'valtio'
import { state } from '../store/store'
import { memo, useEffect, useState } from 'react';

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

export default Customizer;