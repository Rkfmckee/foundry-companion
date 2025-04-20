import { Image } from "@chakra-ui/react";
import { Accordion } from "@chakra-ui/react/accordion";
import { Span } from "@chakra-ui/react/box";
import { Code } from "@chakra-ui/react/code";
import actorUuidLocation from "/actor-uuid-location.png";

const WhereIsThisAccordion = () => {
    return (
        <Accordion.Root variant="subtle" collapsible>
            <Accordion.Item value="where-is-this">
                <div className="where-is-this">
                    <Accordion.ItemTrigger>
                        <Span flex="1">Where do I find this?</Span>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody>
                            <ul>
                                <li>Open your character sheet in Foundry.</li>
                                <li>Look for the icons in the top-right corner.</li>
                                <li>
                                    Click the left-most icon in that list.
                                    <ul>
                                        <li>
                                            Hovering it should say <Code>Copy Document UUID</Code>.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <Image src={actorUuidLocation} alt="Actor UUID location" className="mx-auto" />
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </div>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default WhereIsThisAccordion;
