import { motion } from "framer-motion";

export default function Sticker({ sticker, get, controls, setIsDragging, constraintsRef }) {
    return (
        <motion.div
            className="sticker-div"
            id={sticker.id}
            key={`${sticker.id}-${get.animateMode}`}
            style={{
                position: 'absolute',
                top: sticker.top,
                left: sticker.left,
                width: sticker.width,
                height: sticker.height,
                cursor: 'grab',
                filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5)) drop-shadow(-2px -2px 6px rgba(0, 0, 0, 0.2))',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            drag
            dragControls={controls}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileDrag={{ cursor: 'grabbing' }}
            dragConstraints={constraintsRef}
        >
            <motion.div
                key={get.speed}
                animate={
                    get.animateMode && get.float
                        ? {
                            y: sticker.floatOffsets.y,
                            x: sticker.floatOffsets.x,
                        }
                        : { y: 0, x: 0 }
                }
                transition={{
                    y: {
                        duration: 2 / get.speed,
                        repeat: get.float ? Infinity : 0,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                    },
                    x: {
                        duration: 2 / get.speed,
                        repeat: get.float ? Infinity : 0,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                    },
                }}
            >
                <motion.div
                    key={get.speed}
                    initial={{ rotate: sticker.rotation }}
                    animate={
                        get.animateMode && get.rotate
                            ? {
                                rotate: [0, parseInt(sticker.rotation) + 100],
                            }
                            : { rotate: sticker.rotation }
                    }
                    transition={{
                        duration: 2 / get.speed,
                        repeat: get.rotate ? Infinity : 0,
                        repeatType: 'mirror',
                        ease: 'linear',
                    }}
                >
                    <img
                        src={sticker.src}
                        alt={sticker.annotation}
                        style={{
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                            transform: `scale(${get.scale})`,
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    )
}