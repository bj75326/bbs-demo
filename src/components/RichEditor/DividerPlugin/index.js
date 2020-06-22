import React from 'react';
import DefaultDivider from './components/Divider';
import DefaultButton from './components/DividerButton';
import addDivider from './modifiers/addDivider';
import dividerStyles from './index.less';

const createDividerPlugin = ({
  entityType = 'divider',
  dividerComponent = DefaultDivider,
  buttonComponent = DefaultButton,
  theme = dividerStyles,
  decorator
} = {}) => {

  let Divider = dividerComponent;

  if(typeof decorator === 'function'){
    Divider = decorator(Divider);  
  }

  const ThemedDivider = props => <Divider {...props} theme={theme}/>;
  const Button = buttonComponent;
  const DividerButton = props => (
    <Button
      {...props}
      entityType={entityType}
      addDivider={addDivider(entityType)}
    />
  );

  return {
    blockRendererFn: (block, {getEditorState}) => {
      if(block.getType() === 'atomic'){
        const contentState = getEditorState().getCurrentContent();
        const entity = block.getEntityAt(0);
        if(!entity) return null;
        const type = contentState.getEntity(entity).getType();
        if(type === entityType){
          return {
            component: ThemedDivider,
            editable: false,
          };    
        }  
      } 
      return null; 
    },
    DividerButton,
    addDivider: addDivider(entityType),
  };
};

export default createDividerPlugin;