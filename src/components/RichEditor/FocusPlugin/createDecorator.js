import React, {Component} from 'react';
import classNames from 'classnames';

const getDisplayName = WrappedComponent => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';    
};

export default ({theme, blockKeyStore}) => WrappedComponent => 
  class BlockFocusDecorator extends Component {
    static displayName = `BlockFocus(${getDisplayName(WrappedComponent)})`;
    static WrappedComponent = 
      WrappedComponent.WrappedComponent || WrappedComponent;

    componentDidMount(){
      blockKeyStore.add(this.props.block.getKey());  
    }

    componentWillUnmount(){
      blockKeyStore.remove(this.props.block.getKey());
    }

    onClick = e => {
      e.preventDefault();
      const {isFocused, noFocus} = this.props.blockProps;
      if(!isFocused || noFocus){
        
        console.log('i am trying to focus the image again');
        console.log('isFocused: ', isFocused);
        console.log('noFocus: ', noFocus);
        this.props.blockProps.setFocusToBlock();  
      }        
    }

    render(){
      const {blockProps, className} = this.props;
      const {isFocused} = blockProps;
      const combinedClassName = classNames({
        [theme.focused]: isFocused,
        [theme.unFocused]: !isFocused,   
        [className]: !!className,                  
      });
      
      return (
        <WrappedComponent
          {...this.props}
          onClick={this.onClick}
          className={combinedClassName}  
        />
      );
    }
  }