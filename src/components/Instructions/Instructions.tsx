import React from "react";
import {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Close,
} from "@radix-ui/react-dialog";
import "./Instructions.css";

export default function Instructions({ victim }: { victim: string }) {
  return (
    <Root
      defaultOpen={localStorage.getItem("hasSeenInstructions") ? false : true}
    >
      <Trigger>Instructions</Trigger>
      <Overlay className="modal-overlay" />
      <Content className="modal-body">
        <img
          onLoad={() => {
            localStorage.setItem("hasSeenInstructions", "true");
          }}
          src={`images/${victim.toLowerCase()}.png`}
          alt="RIP"
          id="victim"
        />
        <p>
          {victim} was murdered in the night, and you were framed by the
          culprit!
        </p>
        <ul>
          <li>
            You have five chances to guess the killer, the location, and the
            weapon used.
          </li>
          <li>
            Innocent people may be tight-lipped, but they will never lie. The
            killer has no qualms about deception!
          </li>
          <li>
            The killer would never strike where there would be other witnesses
          </li>
        </ul>
        <Close className="got-it">Got it!</Close>
      </Content>
    </Root>
  );
}
