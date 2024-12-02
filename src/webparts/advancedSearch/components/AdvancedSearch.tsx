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

var classificationCodeList: IDropdownOption[]=[];
var classificationLevelList: IDropdownOption[]=[];
var departmentList: IDropdownOption[]=[];
var durationList: IDropdownOption[]=[];
var languageRequirementList: IDropdownOption[]=[];
var regionList: IDropdownOption[]=[];

export default class AdvancedSearch extends React.Component<IAdvancedSearchProps> {
  public constructor(props: IAdvancedSearchProps, state:IAdvancedSearchProps){ 
    super(props); 
    this.state = { 
    }; 
  } 

  public async componentDidMount(): Promise<void>
  {
    var reacthandler=this;
    const sp:SPFI = getSP(this.props.context);

    sp.web.lists.getByTitle('Department').select('ID,NameEn,NameFr').items().then(function(data){
      for(var k in data){
        departmentList.push({key:data[k].ID, text:data[k].NameEn});
      }
      //reacthandler.setState({departmentList});
      return departmentList;
    });

    sp.web.lists.getByTitle('ClassificationCode').select('ID,NameEn,NameFr').items().then(function(data){
      for(var k in data){
        classificationCodeList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({classificationCodeList});
      return classificationCodeList;
    });

    sp.web.lists.getByTitle('ClassificationLevel').select('ID,NameEn,NameFr').items().then(function(data){
      for(var k in data){
        classificationLevelList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({classificationLevelList});
      return classificationLevelList;
    });

    sp.web.lists.getByTitle('LanguageRequirement').select('ID,NameEn,NameFr').items().then(function(data){
      for(var k in data){
        languageRequirementList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({languageRequirementList});
      return languageRequirementList;
    });

    sp.web.lists.getByTitle('Region').select('ID,NameEn,NameFr').items().then(function(data){
      for(var k in data){
        regionList.push({key:data[k].ID, text:data[k].NameEn});
      }
      reacthandler.setState({regionList});
      return regionList;
    });

    sp.web.lists.getByTitle('Duration').select('ID,NameEn,NameFr').items().then(function(data){
      for(var k in data){
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

    return (
      <section className={`${styles.advancedSearch} ${hasTeamsContext ? styles.teams : ''}`}>
      <div>
        <SearchForm departmentList={departmentList} classificationCodeList={classificationCodeList} classificationLevelList={classificationLevelList} durationList={durationList} languageRequirementList={languageRequirementList} regionList={regionList} />
      </div>
    </section>
    );
  }
}