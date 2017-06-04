var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectedLanguages(props) {
	let languages = ["All", "JavaScript", "Ruby", "Java", "CSS", "Python", "C#"];
		return (
	  	<ul className="languages">
	  		<p>selectedLanguages: {props.selectedLanguages}</p>
	  	{languages.map((lang, index) => {
				return (
					<li 
						style={lang == props.selectedLanguages ? {color: '#d0021b'} : null}
						key={lang}
						onClick={props.onSelect.bind(null, lang)}>
						{lang}
					</li>
				)
	  	})}
	  	</ul>
	  )
}


SelectedLanguages.proptypes = {
	selectedLanguages: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}


class Popular extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedLanguages: "All",
			repos: null
		}
		this.updatedLanguage = this.updatedLanguage.bind(this)
	}

	componentDidMount() {
		this.updatedLanguage(this.state.selectedLanguages)
	}

	updatedLanguage(lang) {
		this.setState({ selectedLanguages: lang })

		api.fetchPopularRepos(lang).then((repos) => {
			this.setState({repos: repos})
		})
		
	}
	render(){
    return(
    	<div>
    		<SelectedLanguages 
    			selectedLanguages={this.state.selectedLanguages}
    			onSelect={this.updatedLanguage}
    		/>

    		{!this.state.repos ? <Loading text="LoadingSuckaa" speed={100} /> : <RepoGrid repos={this.state.repos} /> }

    	</div>
    )
	}
}

module.exports = Popular;