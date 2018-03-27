import React, { Component} from 'react';
import ContentLoader from "react-content-loader";

class MedicineCardLoader extends Component {

  render() {
    const classes = this.props;
    return(
      <ContentLoader
        height={225}
        width={526}
        speed={3}
        primaryColor={"#e6e6e6"}
        secondaryColor={"#dedede"}
        style={{maxHeight: '225px', maxWidth: '526px'}}
      >
        <rect x="0" y="0" rx="0" ry="0" width="150" height="225" />
        <rect x="160" y="0" rx="0" ry="0" width="150" height="15" />
        <rect x="160" y="30" rx="0" ry="0" width="220" height="14" />

      </ContentLoader>
    )
  }
}

export default MedicineCardLoader;
