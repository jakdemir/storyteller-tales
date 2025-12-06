-- Seed data for narrators and myths
-- Provides initial content for the Storyteller Tales application

-- Insert narrators with different cultural backgrounds and storytelling styles
INSERT OR IGNORE INTO narrators (id, name, description, cultural_background, voice_style, example_phrases, elevenlabs_voice_id)
VALUES
    ('narrator-1', 'Elder Sage', 'A wise storyteller who speaks with gravitas and ancient wisdom', 'Universal', 'Deep, measured, contemplative. Uses long pauses for effect and speaks with authority.', 'In the time before time... Such is the way of the ancients... Let this tale guide your path...', 'pNInz6obpgDQGcFmaJgB'),
    ('narrator-2', 'Village Grandmother', 'A warm, nurturing voice that makes every story feel like a cherished memory', 'Eastern European', 'Warm, melodic, intimate. Uses endearments and speaks as if sharing secrets with loved ones.', 'Come closer, little one... My grandmother told me this story... And so, you see, that is how it was...', 'EXAVITQu4vr4xnSDxMaL'),
    ('narrator-3', 'Traveling Bard', 'An animated performer who brings stories to life with dramatic flair', 'Celtic', 'Theatrical, rhythmic, passionate. Varies pace dramatically and uses vivid descriptions.', 'Gather round and hear this tale! With sword raised high... And thus the legend was born!', 'TX3LPaxmHKxFdv7VOQHJ');

-- Insert myths from various cultures
INSERT OR IGNORE INTO myths (id, name, cultural_origin, official_text, summary, key_characters)
VALUES
    ('myth-1', 'Prometheus and the Gift of Fire', 'Greek', 'In the age when gods ruled from Mount Olympus and mortals dwelt in darkness and cold, there lived a Titan named Prometheus. Unlike his brethren who had fought against Zeus, Prometheus possessed a heart that burned with compassion for humanity.

He watched as humans shivered in caves, eating raw flesh, living lives barely above the beasts. Their potential, he knew, lay dormant like seeds in winter earth. And so Prometheus conceived a plan that would change the course of human history.

Under cover of night, he climbed the sacred mountain where the gods kept their divine fire. With steady hands, he stole a glowing ember and hid it within a hollow fennel stalk. Down from Olympus he descended, bearing his precious gift.

When Prometheus gave fire to humanity, it was as if the sun itself had come to dwell among them. They learned to cook their food, to forge metals, to illuminate the darkness. With fire came civilization itself.

But Zeus, king of the gods, looked down from his throne in terrible wrath. None could defy him without consequence. He condemned Prometheus to eternal torment, chaining him to a rock where each day an eagle would devour his liver, only for it to regenerate each night.

Yet Prometheus never regretted his choice. For in giving humanity fire, he had given them the spark of progress, the flame of knowledge, the light of hope. And that gift could never be taken back.', 'Prometheus steals fire from the gods to give to humanity, suffering eternal punishment for his defiance.', 'Prometheus, Zeus, Eagle'),

    ('myth-2', 'The Rainbow Serpent', 'Aboriginal Australian', 'In the Dreamtime, when the world was new and formless, a great serpent slumbered beneath the earth. This was the Rainbow Serpent, oldest of all beings, keeper of the waters of life.

As the serpent stirred from eternal sleep, it began to move through the land. Where it traveled, mountains rose and valleys fell. Its massive body carved the rivers and filled the billabongs. The very landscape bore the marks of its passage.

The Rainbow Serpent called forth the frogs, who had slept with bellies full of water. As they emerged and laughed with joy, water flowed from their mouths, filling the rivers and streams the serpent had created. Life began to flourish wherever the waters touched.

Then the Rainbow Serpent made laws for all creatures. Those who kept the law lived in harmony with the land and waters. Those who broke the law faced the serpent''s wrath, being turned to stone mountains that stand as eternal warnings.

When storms gather and lightning flashes, it is said the Rainbow Serpent moves through the sky, its scales catching the light to form the rainbow. The serpent watches over the land still, ensuring the cycles continue, the rains fall, and life endures.

The Rainbow Serpent teaches us that all things are connected - earth and water, stone and sky, the past and present. We are all part of the Dreamtime, and the Dreamtime lives within us all.', 'The Rainbow Serpent creates the Australian landscape and establishes the laws of nature during the Dreamtime.', 'Rainbow Serpent, Frogs, Creator Spirits'),

    ('myth-3', 'Izanagi and Izanami', 'Japanese', 'Before the islands of Japan existed, there was only the celestial plain above and the primordial ocean below. The divine couple Izanagi and Izanami stood upon the Floating Bridge of Heaven, tasked by the elder gods to create the land.

Izanagi dipped his jeweled spear into the waters below and stirred. When he raised the spear, drops of brine fell from its tip and formed the first island, Onogoro. The divine pair descended to this new land and built a great pillar reaching toward heaven.

They circled this pillar in opposite directions, and when they met, they spoke words of love and were joined in marriage. From their union came the islands of Japan, each one a child born of their divine love. They also gave birth to the gods of the sea, the mountains, the wind, and the trees.

But tragedy struck when Izanami gave birth to the god of fire. The flames scorched her divine body, and she descended to Yomi, the land of the dead. Grief-stricken, Izanagi followed her into the underworld, determined to bring her back.

In the darkness, he lit a torch and looked upon his beloved, only to see her transformed - her body decaying, crawling with maggots. Izanami, shamed and furious, sent the spirits of the dead to pursue him. Izanagi fled, sealing the entrance to Yomi with a great boulder.

At a sacred river, Izanagi purified himself from the pollution of death. From this cleansing, more gods were born - from his left eye came Amaterasu, goddess of the sun; from his right eye came Tsukuyomi, god of the moon; and from his nose came Susanoo, god of storms.

Thus from love and loss, from creation and death, the foundations of the world were laid.', 'The divine couple Izanagi and Izanami create the Japanese islands and give birth to the gods, but tragedy in the underworld leads to the creation of the sun, moon, and storm deities.', 'Izanagi, Izanami, Amaterasu, Tsukuyomi, Susanoo');
