<?php

class TourPage extends Page {
  public function isFreiePlaetze()
    {
        // return $this->freiePlaetze()->value === true ? "✅" : "❌";
        return filter_var($this->freiePlaetze()->value, FILTER_VALIDATE_BOOLEAN) ? "✅" : "❌";
    }
}