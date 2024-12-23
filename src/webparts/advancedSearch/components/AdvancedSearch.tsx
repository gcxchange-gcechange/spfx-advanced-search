/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-for-in-array */
import * as React from 'react';
import styles from './AdvancedSearch.module.scss';
import type { IAdvancedSearchProps } from './IAdvancedSearchProps';
import { IDropdownOption } from '@fluentui/react';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../pnpjsConfig';
import SearchForm from './SearchForm';
import { Globals } from '../Globals';
import { DefaultButton, Icon } from '@fluentui/react';

const classificationCodeList: IDropdownOption[] = [];
const classificationLevelList: IDropdownOption[] = [];
const departmentList: IDropdownOption[] = [];
const durationList: IDropdownOption[] = [];
const languageRequirementList: IDropdownOption[] = [];
const regionList: IDropdownOption[] = [];

export default class AdvancedSearch extends React.Component<IAdvancedSearchProps> {
  strings = Globals.getStrings();

  buttonStyle = {
    fontSize: '16px',
    padding: '0',
    minWidth: '25px',
    minHeight: '25px',
    border: '0',
    color: 'black'
  };

  public constructor(props: IAdvancedSearchProps, state:IAdvancedSearchProps){ 
    super(props); 
    this.state = { 
    }; 
  } 

  public async componentDidMount(): Promise<void>
  {
    const reacthandler = this;
    const sp:SPFI = getSP(this.props.context);

    sp.web.lists.getByTitle('Department').select('ID,NameEn,NameFr').items().then(function(data){
      for(const k in data){
        departmentList.push({key:data[k].ID, text:data[k].NameEn});
      }
      //reacthandler.setState({departmentList});
      return departmentList;
    });

    sp.web.lists.getByTitle('ClassificationCode').select('ID,NameEn,NameFr').items().then(function(data){
      for(const k in data){
        classificationCodeList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({classificationCodeList});
      return classificationCodeList;
    });

    sp.web.lists.getByTitle('ClassificationLevel').select('ID,NameEn,NameFr').items().then(function(data){
      for(const k in data){
        classificationLevelList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({classificationLevelList});
      return classificationLevelList;
    });

    sp.web.lists.getByTitle('LanguageRequirement').select('ID,NameEn,NameFr').items().then(function(data){
      for(const k in data){
        languageRequirementList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({languageRequirementList});
      return languageRequirementList;
    });

    sp.web.lists.getByTitle('Region').select('ID,NameEn,NameFr').items().then(function(data){
      for(const k in data){
        regionList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({regionList});
      return regionList;
    });

    sp.web.lists.getByTitle('Duration').select('ID,NameEn,NameFr').items().then(function(data){
      for(const k in data){
        durationList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({durationList});
      return durationList;
    });
  }  

  public render(): React.ReactElement<IAdvancedSearchProps> {
    const {
      hasTeamsContext,
    } = this.props;

    const open = Globals.isOpen();

    return (
      <section className={`${styles.advancedSearch} ${hasTeamsContext ? styles.teams : ''}`}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{fontSize: '20px', fontWeight: '600', paddingBottom: '20px', display: 'inline-block'}}>
            {this.strings.AdvancedSearch} :
          </div>
          <div style={{float: 'right'}}>
            <DefaultButton 
              style={this.buttonStyle} 
              role='button'
              aria-label={open ? this.strings.btnExpanderOpen : this.strings.btnExpanderClosed}
              aria-expanded={open}
              onClick={() => {
                Globals.setOpen(!open);
                this.forceUpdate();
              }}
            >
              <Icon iconName={open ? 'ChevronUp' : 'ChevronDown'} />
            </DefaultButton>
          </div>
        </div>
        
        <div style={{display: open ? 'block' : 'none'}}>
          <SearchForm departmentList={departmentList} classificationCodeList={classificationCodeList} classificationLevelList={classificationLevelList} durationList={durationList} languageRequirementList={languageRequirementList} regionList={regionList} />
        </div>
    </section>
    );
  }
}