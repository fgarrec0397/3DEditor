import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import { Html } from "@react-three/drei";
import { FieldType, WidgetModule } from "@widgets/_actions/widgetsTypes";
import { FC } from "react";

export interface GeometryFormsProps extends EditableWidget {
    number: number;
    shape: string;
    color: string;
}

type OwnProps = GeometryFormsProps;

const GeometryForms: FC<OwnProps> = ({ shape, color, number }) => {
    const GeometryComponent = shape;

    return (
        <mesh name="GeometryForms1" position={[0, 0, 0]}>
            <GeometryComponent />
            <meshStandardMaterial color={color} />
            <Html>
                <h2>{number}</h2>
            </Html>
        </mesh>
    );
};

export const widget: WidgetModule<GeometryFormsProps> = {
    component: GeometryForms,
    reducer: null,
    widgetDefinition: {
        name: "Geometry",
        options: [
            {
                name: "color2",
                displayName: "Color 2",
                fieldType: FieldType.Text,
                defaultValue: "blue",
            },
            {
                name: "color",
                displayName: "Color",
                fieldType: FieldType.Text,
                defaultValue: "white",
            },
            {
                name: "number",
                displayName: "Number",
                fieldType: FieldType.Number,
                defaultValue: 1,
            },
            {
                name: "shape",
                displayName: "Shape",
                fieldType: FieldType.Select,
                selectOptions: [
                    {
                        value: "BoxGeometry",
                        name: "Cube",
                    },
                    {
                        value: "PlaneGeometry",
                        name: "Plane",
                    },
                ],
                defaultValue: "BoxGeometry",
            },
        ],
    },
};
