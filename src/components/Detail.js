import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import Chip from 'material-ui/Chip';

import Actions from './DetailActions.js';

import { AUTH_TOKEN } from '../constants'

const styles = theme => ({
  card: {
    padding: 25,
    marginBottom: theme.spacing.unit,
    borderRadius: theme.spacing.unit / 2,
    display: 'flex',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  content: {
    marginLeft: 15,
  },
  container: {
    padding: theme.spacing.unit,
  },
  cardBottom: {

  },
  greenChip: {
    margin: theme.spacing.unit,
    height: 15,
    width: 15,
    backgroundColor: '#68DB30',
  },
  redChip: {
    margin: theme.spacing.unit,
    height: 15,
    widtth: 15,
    backgroundColor: '#E33B3B',
  },

});

class Detail extends Component {
  render() {
    const { classes } = this.props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const medicine = this.props.data.findMedicine

    if (this.props.data.loading) {
      return <div>Loading...</div>
    }
    return(
      <div className={classes.container}>
        <Paper className={classes.card}>
          <img src="https://picsum.photos/150/225/?image=440" alt='' />
          <div className={classes.content}>
            <Typography variant="body1" gutterBottom>{medicine.denomination.split(' ', 2).join(' ').replace(',','')}</Typography>
            <Typography variant="caption" gutterBottom>{medicine.denomination}</Typography>
            <div>

            </div>
            <div className={classes.cardBottom}>

            </div>
          </div>
        </Paper>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Indications thérapeutiques</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <span dangerouslySetInnerHTML={{__html: medicine.indicationsTherapeutiques}} />
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        { authToken &&
          <Actions medicine={medicine} />
        }
      </div>
    )
  }
}

const findMedicine = gql`
  query findMedicine($codeCIS: String!) {
    findMedicine(codeCIS: $codeCIS) {
      codeCIS
      denomination
      indicationsTherapeutiques
      formePharmaceutique
      voiesAdministration
      etatCommercialisation
      statutAdministratifAMM
      presentations {
        libelle
        tauxRemboursement
        prix
      }
      compositions {
        referenceDosage
        substancesActives {
          codeSubstance
          dosageSubstance
          denominationSubstance
        }
      }
    }
  }
`;

const DetailWithQuery = graphql(findMedicine, {
  options: (ownProps) => ({
    variables: {
      codeCIS: ownProps.match.params.codeCIS,
    }
  })
})(Detail);

export default withStyles(styles)(DetailWithQuery);
