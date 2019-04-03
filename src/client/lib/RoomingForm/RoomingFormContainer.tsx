import React from 'react';
import RoomingForm from "./RoomingForm";

export interface RoomingFormItem {
    component: React.Component,
    name: string,
    label: string,
    style?: React.CSSProperties,
}

export interface RoomingFormProps {
    title: string,
    containerStyle?: React.CSSProperties,
    onSubmit: (values: any) => any,
    items: RoomingFormItem[],
    validateButton: string,
    cancelButton?: string,
}


const RoomingFormContainer = (props: RoomingFormProps) => {
  return (
      <RoomingForm
          title={props.title}
          containerStyle={props.containerStyle}
          onSubmit={props.onSubmit}
          items={props.items}
          validateButton={props.validateButton}
          cancelButton={props.cancelButton}
      />
  );
};

export default RoomingFormContainer;
