/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField, PrimaryButton, DefaultButton, IStackTokens, Dropdown, IDropdownOption, IDropdownStyles, ICalloutContentStyles  } from "@fluentui/react";
import * as React from "react";
import { Globals, Language } from "../Globals";
import styles from "./AdvancedSearch.module.scss";

export interface ISearchFormProps {
    classificationCodeListEn: IDropdownOption[];
    classificationCodeListFr: IDropdownOption[];
    classificationLevelListEn: IDropdownOption[];
    classificationLevelListFr: IDropdownOption[];
    departmentListEn: IDropdownOption[];
    departmentListFr: IDropdownOption[];
    durationListEn: IDropdownOption[];
    durationListFr: IDropdownOption[];
    durationOperatorsList: IDropdownOption[];
    languageRequirementListEn: IDropdownOption[];
    languageRequirementListFr: IDropdownOption[];
    //languageComprehensionList: IDropdownOption[];
    cityListEn: IDropdownOption[];
    cityListFr: IDropdownOption[];
}

export enum AdvancedSearchSessionKeys {
    Initialized = 'gcx-cm-adsearch-init',
    JobTitle = 'gcx-cm-adsearch-jobTitle',
    ClassificationCode = 'gcx-cm-adsearch-classificationCode',
    ClassificationLevel = 'gcx-cm-adsearch-classificationLevel',
    Department = 'gcx-cm-adsearch-department',
    Duration = 'gcx-cm-adsearch-duration',
    DurationQuantity = 'gcx-cm-adsearch-durationQuantity',
    DurationOperator = 'gcx-cm-adsearch-durationOperator',
    LanguageRequirement = 'gcx-cm-adsearch-languageRequirement',
    //LanguageComprehension = 'gcx-cm-adsearch-languageComprehension',
    City = 'gcx-cm-adsearch-city'
  }

const SearchForm = (props: ISearchFormProps) => {
    const strings = Globals.getStrings();
    //const comprehensionDefault = 'CCC-CCC';
    //const comprehensionSingleDefault = 'C';

    const [jobTitle, setJobTitle] = React.useState('');
    const [classificationCode, setClassificationCode] = React.useState('');
    const [classificationLevel, setClassificationLevel] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [duration, setDuration] = React.useState('');
    const [durationQuantity, setDurationQuantity] = React.useState('1');
    const [durationOperator, setDurationOperator] = React.useState('1');
    const [languageRequirement, setLanguageRequirement] = React.useState('');
    //const [languageComprehension, setLanguageComprehension] = React.useState(comprehensionDefault);
    const [city, setCity] = React.useState('');

    const SetSessionKeys = (): void => {
        sessionStorage.setItem(AdvancedSearchSessionKeys.JobTitle, jobTitle);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationCode, classificationCode);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationLevel, classificationLevel);
        sessionStorage.setItem(AdvancedSearchSessionKeys.Department, department);
        sessionStorage.setItem(AdvancedSearchSessionKeys.Duration, duration);
        sessionStorage.setItem(AdvancedSearchSessionKeys.DurationQuantity, durationQuantity);
        sessionStorage.setItem(AdvancedSearchSessionKeys.DurationOperator, durationOperator);
        sessionStorage.setItem(AdvancedSearchSessionKeys.LanguageRequirement, languageRequirement);
        //sessionStorage.setItem(AdvancedSearchSessionKeys.LanguageComprehension, languageComprehension);
        sessionStorage.setItem(AdvancedSearchSessionKeys.City, city);

        if (Globals.isDebugMode()) {
            console.log('\njobTitle: ' + jobTitle);
            console.log('classificationCode: ' + classificationCode);
            console.log('classificationLevel: ' + classificationLevel);
            console.log('department: ' + department);
            console.log('duration: ' + duration);
            console.log('durationQuantity: ' + durationQuantity);
            console.log('durationOperator: ' + durationOperator);
            console.log('languageRequirement: ' + languageRequirement);
            //console.log('languageComprehension: ' + languageComprehension);
            console.log('city: ' + city +'\n');
        }
        
    }

    const ClearSessionKeys = (): void => {
        sessionStorage.removeItem(AdvancedSearchSessionKeys.JobTitle);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationCode);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationLevel);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.Department);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.Duration);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.DurationQuantity);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.DurationOperator);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.LanguageRequirement);
        //sessionStorage.removeItem(AdvancedSearchSessionKeys.LanguageComprehension);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.City);
    }

    const ClearValues = (): void => {
        setJobTitle('');
        setClassificationCode('');
        setClassificationLevel('');
        setDepartment('');
        setDuration('');
        setDurationQuantity('1');
        setDurationOperator('1');
        setLanguageRequirement('');
        //setLanguageComprehension(comprehensionDefault);
        setCity('');

        ClearSessionKeys();
    };

    React.useEffect(() => {
        sessionStorage.setItem(AdvancedSearchSessionKeys.Initialized, 'true');

        if (Globals.isDebugMode())
            console.log(`${AdvancedSearchSessionKeys.Initialized}: ${sessionStorage.getItem(AdvancedSearchSessionKeys.Initialized)}`);

        return () => {
            sessionStorage.removeItem(AdvancedSearchSessionKeys.Initialized);
        };
    }, []);

    React.useEffect(() => {
        SetSessionKeys();
    }, [jobTitle, classificationCode, classificationLevel, department, duration, durationQuantity, durationOperator, languageRequirement, /* languageComprehension, */ city]);

    // const updateLanguageComprehension = (index: number, value: string): void => {
    //     if (index >= 0 && index <= languageComprehension.length) {
    //         setLanguageComprehension(languageComprehension.slice(0, index) + value + languageComprehension.slice(index + 1));
    //     } else {
    //         if (Globals.isDebugMode())
    //             console.error('Index out of bounds for language comprehension.')
    //     }
    // };

    const titleContainer = {
        paddingBottom: '4px'
    }

    const titleStyle = {
        fontWeight: '500', 
        fontSize: '14px',
        cursor: 'default'
    }

    const borderColor: string = '#c2c2c2';
    const stackTokens: IStackTokens = { childrenGap: 20 };
    // const compStackStyle= {
    //     root: {
    //         width: '100%',
    //         padding: '10px 15px',
    //         gap: '15px'
    //     }
    // }

    const calloutStyles: Partial<ICalloutContentStyles> = {
        calloutMain: {
            overflow: 'auto'
        },
    };

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdownItem: {
            width: 'fit-content',
            minWidth: '100%'
        },
        dropdownItemsWrapper: {
            width: 'max-content',
            minWidth: '100%'
        }
    };

    if (Globals.isOpen()){
        SetSessionKeys();
    } else {
        ClearSessionKeys();
    }

    return (
        <>
        <Stack style={{gap: '10px'}}>
            <div role='group' aria-labelledby='gcx-as-job-title-label'>
                <Stack horizontal verticalAlign='center' style={titleContainer}>
                    <div id='gcx-as-job-title-label'>
                        <b style={titleStyle}>
                            {strings.JobTitle}
                        </b>
                    </div>
                </Stack>
                <TextField 
                    id='gcx-as-job-title' 
                    aria-labelledby='gcx-as-job-title-label'
                    styles={{fieldGroup: { borderColor: borderColor }}}  
                    onChange={(e) => setJobTitle(e.currentTarget.value)} 
                    value={jobTitle} 
                    placeholder={strings.titlePlaceholder}
                />
            </div>
            <div role='group' aria-labelledby='gcx-as-department-label'>
                <Stack horizontal verticalAlign='center' style={titleContainer} >
                    <div id='gcx-as-department-label'>
                        <b style={titleStyle}>
                            {strings.Department}
                        </b>
                    </div>
                </Stack>
                <Dropdown 
                    id='ddDepartment' 
                    aria-labelledby='gcx-as-department-label'
                    styles={{
                        ...dropdownStyles,
                        title: { borderColor: borderColor }
                    }}
                    options={Globals.getLanguage() === Language.French ? props.departmentListFr : props.departmentListEn} 
                    onChange={(e, option) => { 
                        if (option) {
                            setDepartment(option.key.toString());
                        }
                        else {
                            setDepartment('');
                        }
                    }}
                    selectedKey={department ? parseInt(department, 10) : null} 
                    placeholder={strings.ddPlaceholder}
                    calloutProps={{styles: calloutStyles}}
                />
            </div>
            <div>
                <Stack horizontal verticalAlign='center' className={styles.multiField}>

                    <Stack verticalAlign='center' role='group' aria-labelledby='gcx-as-classification-code-label'>
                        <div id='gcx-as-classification-code-label' style={{paddingBottom: '4px'}}>
                            <b style={titleStyle}>
                                {strings.ClassificationCode}
                            </b>
                        </div>
                        <Dropdown 
                            id='ddClassificationCode' 
                            aria-labelledby='gcx-as-classification-code-label'
                            styles={{
                                ...dropdownStyles,
                                title: { borderColor: borderColor }
                            }}
                            options={Globals.getLanguage() === Language.French ? props.classificationCodeListFr : props.classificationCodeListEn} 
                            onChange={(e, option) => { 
                                if (option) {
                                    setClassificationCode(option.key.toString());
                                }
                                else {
                                    setClassificationCode('');
                                }
                            }}
                            selectedKey={classificationCode ? parseInt(classificationCode, 10) : null}
                            placeholder={strings.ddPlaceholder} 
                            calloutProps={{styles: calloutStyles}}
                        />
                    </Stack>
                    <Stack verticalAlign='center' role='group' aria-labelledby='gcx-as-classification-level-label'>
                        <div id='gcx-as-classification-level-label' style={{paddingBottom: '4px'}}>
                            <b style={titleStyle}>
                                {strings.Level}
                            </b>
                        </div>
                        <Dropdown 
                            id='ddClassificationLevel' 
                            aria-labelledby='gcx-as-classification-level-label'
                            styles={{
                                ...dropdownStyles,
                                title: { borderColor: borderColor }
                            }}
                            style={{minWidth: '50px'}}
                            options={Globals.getLanguage() === Language.French ? props.classificationLevelListFr : props.classificationLevelListEn} 
                            onChange={(e, option) => { 
                                if (option) {
                                    setClassificationLevel(option.key.toString());
                                }
                                else {
                                    setClassificationLevel('');
                                }
                            }}
                            selectedKey={classificationLevel ? parseInt(classificationLevel, 10) : null}
                            placeholder={strings.ddPlaceholder} 
                            calloutProps={{styles: calloutStyles}}
                        />
                    </Stack>
                </Stack>
            </div>
            <div role='group' aria-labelledby='gcx-as-language-requirement-label'>
                <Stack horizontal verticalAlign='center' style={titleContainer}>
                    <div id='gcx-as-language-requirement-label'>
                        <b style={titleStyle}>
                            {strings.LanguageRequirement}
                        </b>
                    </div>
                </Stack>
                <Dropdown 
                    id='ddLanguageRequirement' 
                    aria-labelledby='gcx-as-language-requirement-label'
                    styles={{
                        ...dropdownStyles,
                        title: { borderColor: borderColor }
                    }}
                    options={Globals.getLanguage() === Language.French ? props.languageRequirementListFr : props.languageRequirementListEn} 
                    onChange={(e, option) => { 
                        if (option) {
                            setLanguageRequirement(option.key.toString());
                            // if (languageRequirement !== '3')
                            //     setLanguageComprehension(comprehensionDefault);
                        }
                        else {
                            setLanguageRequirement('');
                        }
                    }}
                    selectedKey={languageRequirement ? parseInt(languageRequirement, 10) : null} 
                    placeholder={strings.ddPlaceholder}
                    calloutProps={{styles: calloutStyles}}
                />
            </div>

            {/* { languageRequirement === '3' ? (
                <div>

                    <label>
                        <b style={titleStyle}>
                            {strings.Reading}
                        </b>
                    </label>
                    <Stack horizontal verticalAlign='center' styles={compStackStyle}>
                        
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.English}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(0, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(0, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[0] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.French}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(4, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(4, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[4] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                    </Stack>

                    <label>
                        <b style={titleStyle}>
                            {strings.Written}
                        </b>
                    </label>
                    <Stack horizontal verticalAlign='center' styles={compStackStyle}>
                        
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.English}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(1, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(1, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[1] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.French}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(5, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(5, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[5] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                    </Stack>

                    <label>
                        <b style={titleStyle}>
                            {strings.Oral}
                        </b>
                    </label>
                    <Stack horizontal verticalAlign='center' styles={compStackStyle}>
                        
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.English}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(2, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(2, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[2] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                        <Stack verticalAlign='center' styles={stackStyles}>
                            <label id='gcx-as-language-comprehension-label'>
                                <b style={titleStyle}>
                                    {strings.French}
                                </b>
                            </label>
                            <Dropdown 
                                //aria-labelledby='gcx-as-language-comprehension-en-reading-label'
                                styles={{title: { borderColor: borderColor }}} 
                                options={props.languageComprehensionList} 
                                onChange={(e, option) => { 
                                    if (option) {
                                        updateLanguageComprehension(6, option.text);
                                    }
                                    else {
                                        updateLanguageComprehension(6, comprehensionSingleDefault);
                                    }
                                }} 
                                selectedKey={
                                    languageComprehension
                                    ? props.languageComprehensionList.find(
                                        (item: any) => item.text === languageComprehension[6] 
                                    )?.key : null
                                } 
                            />
                        </Stack>
                    </Stack>
                </div>
                
            ) : null} */}
            <div role='group' aria-labelledby='gcx-as-location-label'>
                <Stack horizontal verticalAlign='center' style={titleContainer}>
                    <div id='gcx-as-location-label'>
                        <b style={titleStyle}>
                            {strings.Location}
                        </b>
                    </div>
                </Stack>
                <Dropdown 
                    id='ddRegion' 
                    aria-labelledby='gcx-as-location-label'
                    styles={{
                        ...dropdownStyles,
                        title: { borderColor: borderColor }
                    }} 
                    options={Globals.getLanguage() === Language.French ? props.cityListFr : props.cityListEn} 
                    onChange={(e, option) => { 
                        if (option) {
                            setCity(option.key.toString());
                        }
                        else {
                            setCity('');
                        }
                    }} 
                    selectedKey={city ? parseInt(city, 10) : null} 
                    placeholder={strings.ddPlaceholder}
                    calloutProps={{styles: calloutStyles}}
                />
            </div>
            <div>
                <Stack horizontal verticalAlign='center' className={styles.multiField}>
                    <Stack verticalAlign='center' role='group' aria-labelledby='gcx-as-duration-label'>
                        <div id='gcx-as-duration-label'>
                            <b style={titleStyle}>
                                {strings.Duration}
                            </b>
                        </div>
                        <Dropdown 
                            id='ddDurationOperator' 
                            aria-labelledby='gcx-as-duration-label'
                            styles={{
                                ...dropdownStyles,
                                title: { borderColor: borderColor }
                            }}
                            options={props.durationOperatorsList} 
                            onChange={(e, option) => { 
                                if (option) {
                                    setDurationOperator(option.key.toString());
                                }
                                else {
                                    setDurationOperator('');
                                }
                            }} 
                            selectedKey={durationOperator ? parseInt(durationOperator, 10) : null} 
                            placeholder={strings.ddPlaceholder}
                            calloutProps={{styles: calloutStyles}}
                        />
                    </Stack>
                    <Stack verticalAlign='center' role='group' aria-labelledby='gcx-as-duration-quantity-label'>
                        <div id='gcx-as-duration-quantity-label'>
                            <b style={titleStyle}>
                                {strings.durationAmount}
                            </b>
                        </div>
                        <TextField 
                            type='number'
                            min={1}
                            max={12}
                            id='txtDurationQuantity' 
                            aria-labelledby='gcx-as-duration-quantity-label'
                            styles={{fieldGroup: { borderColor: borderColor }}}  
                            onChange={(e) => setDurationQuantity(e.currentTarget.value)} 
                            value={durationQuantity} 
                        />
                    </Stack>
                    <Stack verticalAlign='center' role='group' aria-labelledby='gcx-as-duration-units-label'>
                        <div id='gcx-as-duration-units-label' >
                            <b style={titleStyle}>
                                {strings.durationUnit}
                            </b>
                        </div>
                        <Dropdown 
                            id='ddDuration' 
                            aria-labelledby='gcx-as-duration-units-label'
                            styles={{
                                ...dropdownStyles,
                                title: { borderColor: borderColor }
                            }} 
                            options={Globals.getLanguage() === Language.French ? props.durationListFr : props.durationListEn} 
                            onChange={(e, option) => { 
                                if (option) {
                                    setDuration(option.key.toString());
                                }
                                else {
                                    setDuration('');
                                }
                            }} 
                            selectedKey={duration ? parseInt(duration, 10) : null} 
                            placeholder={strings.ddPlaceholder}
                            calloutProps={{styles: calloutStyles}}
                        />
                    </Stack>
                </Stack>
            </div>
            <div className={styles.controls}>
                <Stack horizontal verticalAlign='center' horizontalAlign="start" tokens={stackTokens}>
                    <DefaultButton 
                        id='advancedSearch-Clear'
                        aria-label={strings.Clear}
                        aria-describedby='gcx-advanced-search-header'
                        onClick={() => {
                            ClearValues();
                        }}
                    >
                        {strings.Clear}
                    </DefaultButton>

                    <PrimaryButton 
                        id='advancedSearch-Search'
                        aria-label={strings.Search}
                        aria-describedby='gcx-advanced-search-header'
                    >
                        {strings.Search}
                    </PrimaryButton>
                </Stack>
            </div>
        </Stack>
        </>
    );
}

export default  SearchForm