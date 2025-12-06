-- Migration: Add curated mythology catalog with Turkish and English myths
-- Date: 2025-12-06

-- Add language support to myths table
ALTER TABLE myths ADD COLUMN language TEXT NOT NULL DEFAULT 'en';
ALTER TABLE myths ADD COLUMN summary TEXT;
ALTER TABLE myths ADD COLUMN tags TEXT;

-- Add language support to stories table
ALTER TABLE stories ADD COLUMN language TEXT NOT NULL DEFAULT 'en';

-- Create indexes for language filtering
CREATE INDEX IF NOT EXISTS idx_myths_language ON myths(language);
CREATE INDEX IF NOT EXISTS idx_stories_language ON stories(language);

-- Clear existing myths (they were auto-generated placeholders)
DELETE FROM myths;

-- Insert Turkish Myths (Türk Mitolojisi)

INSERT INTO myths (id, name, cultural_origin, official_text, language, summary, tags) VALUES
('myth-tr-001', 'Şahmeran', 'Turkish/Anatolian', 
'In the ancient lands of Anatolia, beneath the bustling markets and winding streets, there existed a hidden realm known only to serpents. Here ruled Shahmaran, the Queen of Serpents, whose upper body was that of a beautiful woman and lower half that of a magnificent snake. Her wisdom was legendary, accumulated over countless centuries.

A young man named Camsap, while gathering honey with friends, fell into a deep cave and discovered Shahmaran''s underground palace. Mesmerized by her beauty and wisdom, he stayed and learned her secrets. Years passed, and Camsap grew homesick. Shahmaran, knowing the danger, made him promise never to reveal her existence.

But fate had other plans. The Sultan fell gravely ill, and his physicians declared that only Shahmaran''s flesh could cure him. Under torture, Camsap revealed her location. As soldiers came to capture her, Shahmaran told Camsap how to cook her flesh: the first part would kill whoever ate it, the middle would cure, and the tail would grant immortality.

The vizier, eager for power, ate the first part and died. The Sultan ate the middle and was cured. Camsap, in his grief and loyalty, ate the tail and became immortal, forever carrying the burden of Shahmaran''s wisdom and the weight of his betrayal.',
'tr', 
'Half-woman, half-snake queen of serpents, guardian of wisdom and healing',
'["turkish", "anatolian", "wisdom", "sacrifice"]'),

('myth-tr-002', 'Ergenekon Efsanesi', 'Turkish/Turkic',
'Long ago, the Turkic people found themselves trapped in the valley of Ergenekon, surrounded by impassable mountains. For four hundred years, they lived in this natural prison, their numbers growing but their freedom denied. The valley provided sustenance, but the people yearned for the open steppes their ancestors had roamed.

One day, a blacksmith discovered rich deposits of iron ore in the mountains. The elders gathered and devised a plan: they would melt the very mountains that imprisoned them. For months, the people gathered wood and built great furnaces. The blacksmiths worked day and night, heating the iron-rich rocks until they glowed red and began to flow like water.

As the metal melted and ran down the mountainside, a passage began to form. The people worked tirelessly, expanding the opening until it was wide enough for their entire nation to pass through. On an auspicious day, they emerged from Ergenekon, led by their khan, and spread across the steppes to establish the great Turkic empires.

This exodus from Ergenekon marks the rebirth of the Turkish nation. The grey wolf that guided them became their sacred symbol, and the blacksmith''s forge represents the power of determination and ingenuity to overcome any obstacle.',
'tr',
'The founding myth of Turkish people escaping from a valley through iron and fire',
'["turkish", "turkic", "founding", "resilience"]'),

('myth-tr-003', 'Bozkurt Efsanesi', 'Turkish/Turkic',
'In ancient times, when the Turkic tribes faced annihilation from their enemies, only one young boy survived the massacre. Wounded and alone, he wandered the steppes, certain death awaiting him. As he collapsed from exhaustion, a grey wolf appeared before him.

The wolf, sent by Tengri, the sky god, did not harm the boy. Instead, she nursed him with her own milk and protected him from danger. Under her care, the boy grew strong and wise, learning the ways of the wolf: patience, loyalty, and the strength of the pack.

When the boy became a man, the wolf led him to a hidden valley where other survivors had gathered. There, the wolf gave birth to ten sons, half-human and half-wolf. These became the ancestors of the ten Turkic tribes. The grey wolf taught them to hunt, to fight, and to honor the bond between pack members.

To this day, the grey wolf, Bozkurt, remains the sacred symbol of the Turkish people. It represents not just survival, but the divine guidance that led the Turks to greatness. The wolf''s howl reminds them of their origins and the sacred duty to protect their people as the wolf once protected their ancestor.',
'tr',
'The sacred grey wolf who saved and guided the Turkish people',
'["turkish", "turkic", "wolf", "ancestry", "divine"]'),

('myth-tr-004', 'Keloğlan', 'Turkish Folk',
'Keloğlan was a poor, bald boy who lived with his mother in a small village. Though they had little, Keloğlan possessed a sharp mind and a kind heart. One day, he heard that the Sultan''s daughter would marry whoever could make her laugh, for she had never smiled in her life.

Keloğlan set out for the palace with nothing but his wits. Along the way, he encountered a giant who demanded payment to cross his bridge. Keloğlan, having no money, offered to tell the giant a joke instead. The giant, amused by the boy''s audacity, let him pass and even gave him a magical sack.

At the palace, Keloğlan performed such absurd antics that the princess finally laughed. But the Sultan, not wanting a poor bald boy as a son-in-law, set impossible tasks. Keloğlan must bring the Sultan a flying horse, a singing tree, and water from the fountain of life.

Using his wit and the magical sack, Keloğlan accomplished each task. He outsmarted demons, tricked sorcerers, and even made friends with a dragon. In the end, the Sultan had no choice but to honor his word. Keloğlan married the princess, proving that intelligence and kindness are worth more than gold or a full head of hair.',
'tr',
'The clever bald boy who outsmarts giants and wins through wit',
'["turkish", "folk", "wisdom", "cleverness", "humor"]'),

('myth-tr-005', 'Nasreddin Hoca', 'Turkish/Anatolian',
'Nasreddin Hoca was a wise man who lived in Anatolia, known throughout the land for his clever stories and paradoxical wisdom. Though he often appeared foolish, his tales contained profound truths about human nature and society.

One day, Nasreddin lost his ring inside his house. His neighbor found him searching for it outside under a streetlight. "Why are you looking here if you lost it inside?" the neighbor asked. Nasreddin replied, "Because the light is better out here!" This absurd answer taught that people often look for solutions in convenient places rather than where the problem actually lies.

Another time, the Sultan invited Nasreddin to the palace and asked him to preach. Nasreddin asked the crowd, "Do you know what I am going to say?" They answered, "No." He replied, "Then I won''t waste my time on people who know nothing!" and left. The Sultan, embarrassed, invited him again. This time, when asked, the crowd said, "Yes, we know!" Nasreddin responded, "Then you don''t need me to tell you!" and left again.

The third time, half the crowd said yes and half said no. Nasreddin smiled and said, "Then let those who know tell those who don''t!" His wisdom taught that true knowledge cannot be forced, and that sometimes the best teaching is to let people discover truth themselves.',
'tr',
'The wise fool whose humorous tales teach profound lessons',
'["turkish", "wisdom", "humor", "philosophy", "teaching"]');

-- Insert English Myths

INSERT INTO myths (id, name, cultural_origin, official_text, language, summary, tags) VALUES
('myth-en-001', 'King Arthur and Excalibur', 'British/English',
'In the dark days after the fall of Rome, Britain was divided and leaderless. The great wizard Merlin prophesied that a true king would arise, one who could unite the warring kingdoms. To prove this claim, a mysterious sword appeared, embedded in a stone in the churchyard, bearing an inscription: "Whoso pulleth out this sword from this stone is rightwise king born of all England."

Many knights and nobles tried to pull the sword free, but none succeeded. The sword remained fixed, waiting for its destined master. Years passed, and the kingdom fell into greater chaos.

Young Arthur, unaware of his royal heritage, was raised by Sir Ector as a simple squire. When his foster brother Kay needed a sword for a tournament, Arthur, finding none available, remembered the sword in the stone. Without hesitation or ceremony, he grasped the hilt and pulled. The sword slid free as if from butter.

When the nobles saw this, they were amazed and dismayed. How could a mere boy succeed where great knights had failed? But Merlin revealed the truth: Arthur was the son of Uther Pendragon, the rightful heir to the throne. With Excalibur in hand and Merlin as his advisor, Arthur established Camelot and the Knights of the Round Table, bringing a golden age of chivalry and justice to Britain.',
'en',
'The legendary king who pulled the sword from the stone and established Camelot',
'["english", "arthurian", "chivalry", "destiny", "magic"]'),

('myth-en-002', 'Robin Hood', 'English',
'In the reign of King Richard the Lionheart, when the king was away at the Crusades, his brother Prince John ruled England with cruelty and greed. The Sheriff of Nottingham, John''s enforcer, taxed the poor mercilessly while the nobles lived in luxury.

In Sherwood Forest, a band of outlaws gathered under the leadership of Robin Hood, a skilled archer who had been unjustly declared an outlaw. Robin and his Merry Men, including Little John, Friar Tuck, and Will Scarlet, lived free in the greenwood, beyond the reach of corrupt law.

Robin Hood became famous for his daring robberies of wealthy nobles and corrupt clergy traveling through Sherwood. But he was no common thief—every coin stolen from the rich was distributed among the poor villagers who suffered under John''s tyranny. The people loved him as a hero, while the Sheriff raged at his inability to capture the outlaw.

Many times the Sheriff tried to trap Robin, offering rewards and sending soldiers into the forest. But Robin''s knowledge of Sherwood and his exceptional archery skills kept him always one step ahead. In archery contests, disguised as a simple yeoman, Robin would win the prize and reveal his identity only after escaping.

When King Richard finally returned, he pardoned Robin Hood, recognizing that the outlaw had protected the people when the law had failed them. Robin''s legend lives on as a symbol of resistance against tyranny and the fight for justice.',
'en',
'The outlaw archer who robbed from the rich to give to the poor',
'["english", "justice", "archery", "resistance", "heroism"]'),

('myth-en-003', 'Beowulf and Grendel', 'Anglo-Saxon/English',
'In the land of the Danes, King Hrothgar built a magnificent mead hall called Heorot, where his warriors gathered to feast and celebrate. But their joy was short-lived. From the dark marshes came Grendel, a monstrous creature descended from Cain, who was enraged by the sounds of human happiness.

Night after night, Grendel attacked Heorot, slaughtering warriors as they slept. No weapon could harm the monster, for he had cast a spell against all blades. For twelve years, the great hall stood empty at night, and Hrothgar''s kingdom lived in terror.

News of this tragedy reached Beowulf, a mighty warrior from the land of the Geats. Seeking glory and wishing to help the Danes, Beowulf sailed to Hrothgar''s kingdom with fourteen companions. He vowed to face Grendel without weapons, matching strength against strength.

That night, Beowulf and his men waited in Heorot. When Grendel burst through the doors, he immediately devoured one warrior. But when he reached for Beowulf, the hero seized the monster''s arm with a grip like iron. They wrestled with terrible fury, shaking the very foundations of the hall.

Beowulf''s strength proved greater. With a mighty wrench, he tore Grendel''s arm from its socket. The monster fled, mortally wounded, to die in his marsh. Beowulf hung the arm as a trophy in Heorot, and the Danes celebrated their deliverance. But the victory was not complete—Grendel''s mother would soon seek revenge.',
'en',
'The mighty warrior who defeated the monster terrorizing Heorot Hall',
'["english", "anglo-saxon", "heroism", "monsters", "strength"]'),

('myth-en-004', 'The Green Man', 'British/Celtic',
'In the ancient forests of Britain, before the Romans came and before the Saxons arrived, there dwelt a spirit as old as the trees themselves. The Green Man, whose face was formed of living leaves and whose breath was the wind through the branches, embodied the eternal cycle of nature.

In spring, the Green Man would awaken, his face bright with fresh leaves and flowers. As he walked through the forest, plants would spring up in his footsteps, and the trees would burst into bloom. He represented the irresistible force of growth and renewal that comes with the warming sun.

Through summer, the Green Man was at his most powerful, his face thick with foliage, his presence felt in every grove and glade. The people would leave offerings at the forest''s edge, thanking him for the abundance of the growing season.

As autumn approached, the Green Man''s leaves would turn gold and red, then brown. He would retreat deeper into the forest, his power waning as the year grew old. In winter, he would sleep beneath the frozen earth, his face bare branches against the snow.

But the people knew he was not dead, only resting. For in every seed that survived the winter, in every root that held fast beneath the frost, the Green Man endured. And when spring returned, so would he, eternal and unchanging, a reminder that death is not an end but a transformation, and that life always returns.',
'en',
'The ancient spirit of nature, rebirth, and the cycle of seasons',
'["english", "celtic", "nature", "seasons", "rebirth"]'),

('myth-en-005', 'The Lady of the Lake', 'Arthurian/British',
'In the mystical realm of Avalon, where the veil between worlds grows thin, there dwelt an enchantress of great power known as the Lady of the Lake. She was guardian of ancient magic and keeper of sacred relics, dwelling in a palace beneath the waters of a hidden lake.

When Arthur proved himself the rightful king by pulling the sword from the stone, Merlin knew that the young king would need a greater weapon to face the trials ahead. He brought Arthur to the enchanted lake and called upon the Lady.

From the depths of the crystal-clear water, a hand emerged, clad in white samite and holding aloft a magnificent sword. Its blade gleamed with otherworldly light, and its hilt was adorned with jewels that seemed to hold the stars themselves. This was Excalibur, the sword of kings, forged in Avalon by ancient magic.

The Lady of the Lake appeared, walking upon the water as if it were solid ground. She spoke to Arthur: "This sword is yours, rightful king, but know that it comes with a price. The sword will serve you well and bring you victory, but one day it must be returned to the lake from whence it came."

Arthur took Excalibur and with it united Britain, establishing his kingdom of Camelot. The sword never failed him in battle, and its scabbard protected him from harm. But when Arthur fell in his final battle against Mordred, mortally wounded, he commanded Sir Bedivere to return Excalibur to the Lady of the Lake.

Three times Bedivere approached the water, and twice he could not bring himself to throw away such a treasure. But on the third attempt, he hurled the sword far out over the lake. The Lady''s hand rose from the water, caught Excalibur, brandished it three times, and drew it beneath the waves. The cycle was complete, and the sword returned to its mystical home, waiting perhaps for another king in Britain''s hour of need.',
'en',
'The mystical enchantress who gave Arthur Excalibur and guards Avalon',
'["english", "arthurian", "magic", "enchantress", "avalon"]');

-- Update existing narrators to support Turkish
-- (They can narrate in both languages based on the myth's language)
