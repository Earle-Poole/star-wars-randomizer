$(function (){
	let randomChar = 1;
	let characterSpecies = '';
	let darthVaderHeight = 202;

	grabChar = () => $.ajax({
		type: 'GET',
		url: 'https://swapi.co/api/people/' + randomChar,
		success: (characterInfo) => {
			$.ajax({
				type: 'GET',
				url: characterInfo.species,
				success: (species) => {
					characterSpecies = species.name;
					$('#species').append(characterSpecies);
				}
			})
			$.ajax({
				type: 'GET',
				url: characterInfo.films[0],
				success: (film) => {
					characterFilm = film.title;
					$('#character-film').append(characterFilm);
				}
			})
			$('#character-name').append(characterInfo.name);
			$('#character-description').append(
				'<p>' 
				+ characterInfo.name + 
				' is a '
				+ characterInfo.skin_color +
				' skinned, '
				+ characterInfo.eye_color + 
				' eyed <span id="species"></span>.' +
				' He appeared in the film <span id="character-film"></span>' + 
				'.</p>'
			);
			if(darthVaderHeight > characterInfo.height){
				let heightDifference = darthVaderHeight - characterInfo.height;

				$('#character-description').append(
					'<p>'
					+ characterInfo.name +
					' is '
					+ heightDifference +
					'cm shorter than Darth Vader' +
					'!</p>'
				)
			} else if (darthVaderHeight < characterInfo.height){
				let heightDifference = characterInfo.height - darthVaderHeight;

				$('#character-description').append(
					'<p>'
					+ characterInfo.name +
					' is '
					+ heightDifference +
					'cm taller than Darth Vader' +
					'!</p>'
				)
			} else {
				$('#character-description').append(
					'<p>'
					+ characterInfo.name +
					' is the same height as Darth Vader' +
					'!</p>'
				)
			}
		}
	});
	grabChar();

	$('#get-new-char').on('click', () => {
		randomChar = Math.floor((Math.random() * 88) + 1);
		$('#character-name').empty();
		$('#character-description').empty();
		grabChar();
	})

})