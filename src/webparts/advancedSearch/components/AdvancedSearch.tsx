/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { SessionController } from '../SessionController';

const classificationCodeListEn: IDropdownOption[] = [];
const classificationCodeListFr: IDropdownOption[] = [];
const classificationLevelListEn: IDropdownOption[] = [];
const classificationLevelListFr: IDropdownOption[] = [];
const departmentListEn: IDropdownOption[] = [];
const departmentListFr: IDropdownOption[] = [];
const durationListEn: IDropdownOption[] = [];
const durationListFr: IDropdownOption[] = [];
const durationOperatorList: IDropdownOption[] = [];
const languageRequirementListEn: IDropdownOption[] = [];
const languageRequirementListFr: IDropdownOption[] = [];
// const languageComprehensionList: IDropdownOption[] = [
//   { key: 0, text: 'A' },
//   { key: 1, text: 'B' },
//   { key: 2, text: 'C' },
// ];
const cityListEn: IDropdownOption[] = [];
const cityListFr: IDropdownOption[] = [];

const classCodeCtrl = new SessionController<any[]>('gcx-cm-classCodeList');
const classLevelCtrl = new SessionController<any[]>('gcx-cm-classLevelList');
const departmentCtrl = new SessionController<any[]>('gcx-cm-departmentList');
const durationCtrl = new SessionController<any[]>('gcx-cm-durationList');
const languageReqCtrl = new SessionController<any[]>('gcx-cm-languageReqList');
const cityCtrl = new SessionController<any[]>('gcx-cm-cityList');

export default class AdvancedSearch extends React.Component<IAdvancedSearchProps> {
  strings = Globals.getStrings();
  sp: SPFI;

  buttonStyle = {
    fontSize: '16px',
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
    await this.fetchData();
  } 
  
  public async componentDidUpdate(prevProps: Readonly<IAdvancedSearchProps>, prevState: Readonly<{}>, snapshot?: any): Promise<void> {
    if (prevProps.language !== this.props.language && (this.props.language === Language.English || this.props.language === Language.French)) {
      const strings = Globals.getStrings();

      durationOperatorList.length = 0;

      durationOperatorList.push({ key: 0, text: strings.operatorExactly});
      durationOperatorList.push({ key: 1, text: strings.operatorGreaterThan});
      durationOperatorList.push({ key: 2, text: strings.operatorLessThan});

      this.setState({durationOperatorList});

      this.forceUpdate();
    }
  }

  private fetchData(): void {
    const reacthandler = this;
    this.sp = getSP(this.props.context);
    const strings = Globals.getStrings();
    
    classCodeCtrl.fetch(this.sp.web.lists.getByTitle('ClassificationCode').items.select('ID,NameEn,NameFr').top(5000))
    .then((data) => {
      classificationCodeListEn.length = 0;
      classificationCodeListFr.length = 0;
      
      for(const k in data){
        classificationCodeListEn.push({key:data[k].ID, text: data[k].NameEn});
        classificationCodeListFr.push({key:data[k].ID, text: data[k].NameFr});
      }

      classificationCodeListEn.sort((a, b) => a.text.localeCompare(b.text));
      classificationCodeListFr.sort((a, b) => a.text.localeCompare(b.text));

      reacthandler.setState({classificationCodeListEn, classificationCodeListFr});
    });

    classLevelCtrl.fetch(this.sp.web.lists.getByTitle('ClassificationLevel').items.select('ID,NameEn,NameFr').top(5000))
    .then((data) => {
      classificationLevelListEn.length = 0;
      classificationLevelListFr.length = 0;
      
      for(const k in data){
        classificationLevelListEn.push({key:data[k].ID, text: data[k].NameEn});
        classificationLevelListFr.push({key:data[k].ID, text: data[k].NameFr});
      }

      reacthandler.setState({classificationLevelListEn, classificationLevelListFr});
    });

    departmentCtrl.fetch(this.sp.web.lists.getByTitle('Department').items.select('ID,NameEn,NameFr').top(5000))
    .then((data) => {
      departmentListEn.length = 0;
      departmentListFr.length = 0;
      
      for(const k in data){
        departmentListEn.push({key:data[k].ID, text: data[k].NameEn});
        departmentListFr.push({key:data[k].ID, text: reacthandler.fixEncoding(data[k].NameFr)});
      }

      departmentListEn.sort((a, b) => a.text.localeCompare(b.text));
      departmentListFr.sort((a, b) => a.text.localeCompare(b.text));

      reacthandler.setState({departmentListEn, departmentListFr});
    });

    durationCtrl.fetch(this.sp.web.lists.getByTitle('Duration').items.select('ID,NameEn,NameFr').top(5000))
    .then((data) => {
      durationListEn.length = 0;
      durationListFr.length = 0;
      
      for(const k in data){
        durationListEn.push({key:data[k].ID, text: data[k].NameEn});
        durationListFr.push({key:data[k].ID, text: data[k].NameFr});
      }

      reacthandler.setState({durationListEn, durationListFr});
    });

    languageReqCtrl.fetch(this.sp.web.lists.getByTitle('LanguageRequirement').items.select('ID,NameEn,NameFr').top(5000))
    .then((data) => {
      languageRequirementListEn.length = 0;
      languageRequirementListFr.length = 0;
      
      for(const k in data){
        languageRequirementListEn.push({key:data[k].ID, text: data[k].NameEn});
        languageRequirementListFr.push({key:data[k].ID, text: data[k].NameFr});
      }

      reacthandler.setState({languageRequirementListEn, languageRequirementListFr});
    });

    cityCtrl.fetch(this.sp.web.lists.getByTitle('City').items.select('ID,NameEn,NameFr').top(5000))
    .then((data) => {
      cityListEn.length = 0;
      cityListFr.length = 0;
      
      for(const k in data){
        cityListEn.push({key:data[k].ID, text: data[k].NameEn});
        cityListFr.push({key:data[k].ID, text: data[k].NameFr});
      }

      cityListEn.sort((a, b) => a.text.localeCompare(b.text));
      cityListFr.sort((a, b) => a.text.localeCompare(b.text));

      reacthandler.setState({cityListEn, cityListFr});
    });

    durationOperatorList.length = 0;

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
        <div style={{display: 'flex', alignItems: 'center', paddingBottom: open ? '20px' : '0px', gap: '10px'}}>
          <h2 id='gcx-advanced-search-header' style={{margin: 0, fontSize: '20px', fontWeight: '600', display: 'inline-block'}}> 
            {this.strings.AdvancedSearch}
          </h2> 
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
            departmentListEn={departmentListEn} 
            departmentListFr={departmentListFr} 
            classificationCodeListEn={classificationCodeListEn} 
            classificationCodeListFr={classificationCodeListFr}
            classificationLevelListEn={classificationLevelListEn} 
            classificationLevelListFr={classificationLevelListFr}
            durationListEn={durationListEn} 
            durationListFr={durationListFr} 
            durationOperatorsList={durationOperatorList} 
            languageRequirementListEn={languageRequirementListEn} 
            languageRequirementListFr={languageRequirementListFr} 
            // languageComprehensionList={languageComprehensionList}
            cityListEn={cityListEn} 
            cityListFr={cityListFr}
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