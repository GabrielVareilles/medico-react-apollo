import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class Detail extends Component {
  render() {
    const { classes } = this.props;
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }
    return(
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {this.props.data.medicine.denomination}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ExpansionPanel className={classes.paper}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Indications thérapeutiques</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {this.props.data.medicine.indicationsTherapeutiques}
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const MedicineQuery = gql`
  query MedicineQuery($codeCIS: Int!) {
    medicine(codeCIS: $codeCIS) {
      codeCIS
      denomination
      indicationsTherapeutiques
      formePharmaceutique
      voiesAdministration
      etatCommercialisation
      statutAdministratifAMM
      interactions {
        famille1
        famille2
      }
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

const DetailWithQuery = graphql(MedicineQuery, {
  options: (ownProps) => ({
    variables: {
      codeCIS: parseInt(ownProps.match.params.codeCIS)
    }
  })
})(Detail);

export default withStyles(styles)(DetailWithQuery);
