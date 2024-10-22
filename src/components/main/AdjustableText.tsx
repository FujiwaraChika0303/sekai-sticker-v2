import { useRef, useEffect } from 'react';
import { Text, Transformer } from 'react-konva';

type AdjustableTextProps = {
    content: string;

    shapeProps: any
    isSelected: boolean
    onSelect: Function
    onChange: Function
}

function AdjustableText({ shapeProps, isSelected, onSelect, onChange, content = "Some text on canvas" }: AdjustableTextProps) {

    const shapeRef = useRef<any>();
    const trRef = useRef<any>();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);


    return (
        <>
            <Text
                fillStyle="black"
                text={content}
                fontSize={48}
                fontFamily="YurukaStd"
                strokeWidth={2}
                stroke={"white"}
                draggable
                
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                {...shapeProps}

                onDragEnd={(e) => {
                    onChange({
                        ...shapeProps,
                        x: e.target.x(),
                        y: e.target.y(),
                    });
                }}

                onTransformEnd={(_) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY),
                    });
                }}
            />

            {isSelected && (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {

                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                            return oldBox;
                        }

                        return newBox;
                    }}
                />
            )}

        </>
    )
}

export default AdjustableText
