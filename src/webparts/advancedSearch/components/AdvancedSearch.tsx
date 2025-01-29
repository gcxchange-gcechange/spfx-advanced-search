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
import { Globals, Language } from '../Globals';
import { DefaultButton, Icon } from '@fluentui/react';
import { Buffer } from 'buffer';

const classificationCodeList: IDropdownOption[] = [];
const classificationLevelList: IDropdownOption[] = [];
const departmentList: IDropdownOption[] = [];
const durationList: IDropdownOption[] = [];
const durationOperatorList: IDropdownOption[] = [];
const languageRequirementList: IDropdownOption[] = [];
// const languageComprehensionList: IDropdownOption[] = [
//   { key: 0, text: 'A' },
//   { key: 1, text: 'B' },
//   { key: 2, text: 'C' },
// ];
const cityList: IDropdownOption[] = [];


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
    const strings = Globals.getStrings();
    const lang = Globals.getLanguage();

    sp.web.lists.getByTitle('Department').select('ID,NameEn,NameFr').items().then((data) => {
      for(const k in data){
        departmentList.push({key:data[k].ID, text: lang === Language.French ? this.fixEncoding(data[k].NameFr) : data[k].NameEn});
      }

      departmentList.sort((a, b) => a.text.localeCompare(b.text));

      reacthandler.setState({departmentList});
      return departmentList;
    });

    sp.web.lists.getByTitle('ClassificationCode').select('ID,NameEn,NameFr').items().then((data) => {
      for(const k in data){
        classificationCodeList.push({key:data[k].ID, text: lang === Language.French ? data[k].NameFr : data[k].NameEn});
      }
      reacthandler.setState({classificationCodeList});
      return classificationCodeList;
    });

    sp.web.lists.getByTitle('ClassificationLevel').select('ID,NameEn,NameFr').items().then((data) => {
      for(const k in data){
        classificationLevelList.push({key:data[k].ID, text: lang === Language.French ? data[k].NameFr : data[k].NameEn});
      }
      reacthandler.setState({classificationLevelList});
      return classificationLevelList;
    });

    sp.web.lists.getByTitle('LanguageRequirement').select('ID,NameEn,NameFr').items().then((data) => {
      for(const k in data){
        languageRequirementList.push({key:data[k].ID, text: lang === Language.French ? data[k].NameFr : data[k].NameEn});
      }
      reacthandler.setState({languageRequirementList});
      return languageRequirementList;
    });

    sp.web.lists.getByTitle('City').select('ID,NameEn,NameFr').items().then((data) => {
      for(const k in data){
        cityList.push({key:data[k].ID, text: lang === Language.French ? data[k].NameFr : data[k].NameEn});
      }

      cityList.sort((a, b) => a.text.localeCompare(b.text));

      reacthandler.setState({cityList});
      return cityList;
    });

    sp.web.lists.getByTitle('Duration').select('ID,NameEn,NameFr').items().then((data) => {
      for(const k in data){
        durationList.push({key:data[k].ID, text: lang === Language.French ? data[k].NameFr : data[k].NameEn});
      }
      reacthandler.setState({durationList});
      return durationList;
    });

    durationOperatorList.splice(0, durationOperatorList.length);
    durationOperatorList.push({ key: 0, text: strings.operatorExactly});
    durationOperatorList.push({ key: 1, text: strings.operatorGreaterThan});
    durationOperatorList.push({ key: 2, text: strings.operatorLessThan});

    reacthandler.setState({durationOperatorList});
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
          <SearchForm 
            departmentList={departmentList} 
            classificationCodeList={classificationCodeList} 
            classificationLevelList={classificationLevelList} 
            durationList={durationList} 
            durationOperatorsList={durationOperatorList} 
            languageRequirementList={languageRequirementList} 
            // languageComprehensionList={languageComprehensionList}
            cityList={cityList} 
          />
        </div>
    </section>
    );
  }

  private fixEncoding(input: string): string {
    const buffer = Buffer.from(input, 'binary');
    return buffer.toString('utf8');
  }
}