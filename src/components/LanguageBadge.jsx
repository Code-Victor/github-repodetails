import { githubColor } from "../constant/githubColor";
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
  function LanguageBadge({language}){
      console.log('badge',language)
      if (language){
          
        const  refinedLanguage = language.split(' ').map(capitalize).join(' ');
          return(
              <div className="flex gap-1 items-center">
                  <div className={`h-4 w-4 rounded-2xl`} style={{backgroundColor:githubColor[refinedLanguage]?.color||githubColor[language]?.color}}>
                  </div>
                  <span>{language}</span>
              </div>
          )
      }
      return <div></div>
    
}
export default LanguageBadge