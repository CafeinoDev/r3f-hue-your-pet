import { motion, AnimatePresence } from 'framer-motion'
import { AiOutlineHighlight } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from '../store/store'
import { lazy, Suspense } from 'react';

const Customizer = lazy(() => import('./Customizer') );

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
                    <Suspense>
                        <Customizer />
                    </Suspense>
                </motion.section>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Overlay;