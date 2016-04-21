package pl.pragmatists.starter;

import java.util.Optional;
import java.util.stream.Stream;

public interface Repository<T> {
    Optional<T> findOne();

    Optional<T> remove();

    Stream<T> list();
}
