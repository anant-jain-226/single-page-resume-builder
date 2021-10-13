import React, { useState } from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { MdColorize } from "react-icons/md";
import { themes, useThemes } from "../../stores/theme.store";

const Item = styled.div`
  display: flex;
  width: 250px;
  height: 30px;
  cursor: pointer;
  margin-bottom: 20px;
  border: 1px solid white;
`;

const Color: any = styled.div`
  width: 25%;
  height: 100%;
  background-color: ${(props: any) => props.themeColor};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
    font-size: 1rem;
    mix-blend-mode: difference;
  }
`;

const Label: any = styled.div`
  color: white;
  font-size: 1rem;
`;

export function ThemeSettings() {
  const customTheme = useThemes((state: any) => state.customTheme);
  const [chooseTheme, chooseCustomTheme, setCustomTheme] = useThemes(
    (state: any) => [state.chooseTheme, state.chooseCustomTheme, state.setCustomTheme],
    shallow
  );

  const [type, setType] = useState("");
  const [isCustomTheme, setIsCustomTheme] = useState(false);
  const color = customTheme[type];

  function handleChangeComplete(color: any) {
    setCustomTheme(color.hex, type);
    setType(type);
  }

  function onPreset(event: any) {
    setIsCustomTheme(false);
    chooseTheme(event.currentTarget.dataset.id);
  }

  function onCustomTheme() {
    setIsCustomTheme(true);
    chooseCustomTheme();
  }

  function getThemeItem(theme: any) {
    return (
      <div key={theme.id}>
        <Label>Preset {theme.id}</Label>
        <Item data-id={theme.id} onClick={onPreset}>
          <Color themeColor={theme.backgroundColor} />
          <Color themeColor={theme.fontColor} />
          <Color themeColor={theme.primaryColor} />
          <Color themeColor={theme.secondaryColor} />
        </Item>
      </div>
    );
  }

  return (
    <>
      {themes.map((theme) => getThemeItem(theme))}
      <Label>Custom</Label>
      <Item onClick={onCustomTheme}>
        <Color onClick={() => setType("backgroundColor")} themeColor={customTheme.backgroundColor}>
          <MdColorize />
        </Color>
        <Color onClick={() => setType("fontColor")} themeColor={customTheme.fontColor}>
          <MdColorize />
        </Color>
        <Color onClick={() => setType("primaryColor")} themeColor={customTheme.primaryColor}>
          <MdColorize />
        </Color>
        <Color onClick={() => setType("secondaryColor")} themeColor={customTheme.secondaryColor}>
          <MdColorize />
        </Color>
      </Item>
      {isCustomTheme ? (
        <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
      ) : null}
    </>
  );
}
