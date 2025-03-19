import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAdvancedSearchProps {
  language: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  selectedKey?: string[];
  debug: boolean;
  cacheTime: number
  //decisionChoiceCallback?:(option: string) => void;
  //searchText: string;
}
