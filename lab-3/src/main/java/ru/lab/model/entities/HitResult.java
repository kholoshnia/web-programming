package ru.lab.model.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "hit_results")
@Data
@NoArgsConstructor
public final class HitResult implements Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NonNull
  @Column(name = "x_value")
  private Double xValue;

  @NonNull
  @Column(name = "y_value")
  private Double yValue;

  @NonNull
  @Column(name = "r_value")
  private Double rValue;

  @NonNull
  @Column(name = "result")
  private Boolean result;

  public HitResult(
      @NonNull Double xValue,
      @NonNull Double yValue,
      @NonNull Double rValue,
      @NonNull Boolean result) {
    this.xValue = xValue;
    this.yValue = yValue;
    this.rValue = rValue;
    this.result = result;
  }
}
