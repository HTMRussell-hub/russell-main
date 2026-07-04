const part1 = ['A confused penguin', 
                'A caffeinated squirrel', 
                'A dramatic toaster',
                'A philosophical banana',
                'A time-traveling llama',
                'A disco-dancing octopus',
                'A ninja cat',
                'A singing cactus',
                'A juggling platypus',
                'A tap-dancing robot'
            ];
const part2 = ['wearing a tuxedo', 
                'holding a megaphone', 
                'covered in glitter',
                'riding a unicycle',
                'with a monocle and top hat',
                'carrying a briefcase full of marshmallows',
                'wearing a superhero cape',
                'with a rainbow-colored mohawk',
                'holding a rubber chicken',
                'wearing a tutu and ballet shoes'
            ];
const part3 = ['stumbled into the local library', 
                'demanded a refund for the moon', 
                'tried to start a fight with a mirror',
                'accidentally joined a knitting club',
                'decided to become a professional yodeler',
                'attempted to teach a yoga class to squirrels',
                'tried to sell ice to penguins',
                'mistakenly entered a parallel universe',
                'decided to become a professional kazoo player',
                'tried to convince a group of ants to form a rock band'
            ];

const part4 = ['Suddenly,', 
                'To everyone\'s surprise,', 
                'Unfortunately,',
                'In a twist of fate,',
                'Out of nowhere,',
                'In a bizarre turn of events,',
                'Unexpectedly,',
                'In a shocking revelation,',
                'To the astonishment of all,',
                'In an unbelievable moment,'
            ];
const part5 = ['a giant marshmallow', 
                'the ghost of a disco dancer', 
                'a sentient vacuum cleaner',
                'a time-traveling toaster',
                'a tap-dancing octopus',
                'a ninja squirrel',
                'a singing cactus',
                'a juggling monkey',
                'a tap-dancing robot',
                'a confused penguin',
                'an unemployed lion'
            ];
const part6 = ['offered some unsolicited fashion advice.',
                 'began reciting interpretive poetry.', 
                 'challenged everyone to a dance-off.',
                'started a philosophical debate about the meaning of life.',
                'decided to become a trombone player.',
                'attempted to teach a yoga class to squirrels.',
                'tried to sell ice to polar bears.',
                'mistakenly entered a parallel universe.',
                'decided to become a professional Irish dancer.',
                'tried to convince a group of nuns to fight a group of priests.'
            ];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

document.getElementById('generate-btn').addEventListener('click', () => {
    const s1 = `${getRandom(part1)} ${getRandom(part2)} ${getRandom(part3)}.`;
    const s2 = `${getRandom(part4)} ${getRandom(part5)} ${getRandom(part6)}`;
    
    document.getElementById('message-display').innerText = `${s1} ${s2}`;
});


//